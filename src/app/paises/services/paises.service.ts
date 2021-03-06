import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PaisSmall, Pais } from '../interfaces/paises.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaisesService {

  private _regiones: string[] = ["Africa", "Americas", "Asia", "Europe", "Oceania"];
  private _baseUrl: string= 'https://restcountries.com/v3.1'

  get regiones(): string[]{
    return [...this._regiones];
  }

  constructor(  private http: HttpClient ) { }

  getPaisesPorRegion( region: string ): Observable<PaisSmall[]> {
    
    const url: string = `${this._baseUrl}/region/${region}?fields=cca3,name`
        return this.http.get<PaisSmall[]>(url);
  }

  getPaisPorCodigo( paisCodigo: string ): Observable<Pais> {
    
    const url: string = `${this._baseUrl}/alpha/${paisCodigo}`
        return this.http.get<Pais>(url);
  }  
}
