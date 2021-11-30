import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { switchMap, tap } from 'rxjs';
import { PaisSmall, Pais } from '../../interfaces/paises.interface';
import { PaisesService } from '../../services/paises.service';

@Component({
  selector: 'app-selector-page',
  templateUrl: './selector-page.component.html'
})
export class SelectorPageComponent implements OnInit {

  miFormulario: FormGroup = this.fb.group({
    region    : ['', Validators.required ],
    pais      : ['', Validators.required ],
    frontera  : ['', Validators.required ]

  })

  // llenar selectores
  regiones:string[] = [];
  paises : PaisSmall[] = [];
  // fronteras : Pais = {
  //   borders: []
  // }
  

  constructor(  private fb : FormBuilder,
                private paisesService : PaisesService ) {}

  ngOnInit(): void {

    this.regiones = this.paisesService.regiones;

    //Cuando cambie la region
    
    this.miFormulario.get('region')?.valueChanges
      .pipe(
        tap( _ => {
          this.miFormulario.get('pais')?.reset('')
        }),
        switchMap(region => this.paisesService.getPaisesPorRegion(region)))
        .subscribe( paises => {
          this.paises = paises;
      })

    //Cuando Cambie Pais
    this.miFormulario.get('pais')?.valueChanges
      .subscribe( paisCodigo => {

        console.log(paisCodigo);
        console.log('hola');

        this.paisesService.getPaisPorCodigo(paisCodigo)
          .subscribe(fronteras => {
            console.log(fronteras);
            console.log(fronteras.area);
            // this.fronteras = fronteras;
          })

      })
  }

  guardar(){
    console.log(this.miFormulario.value);
  }

  borrar(){
 
  }

}
