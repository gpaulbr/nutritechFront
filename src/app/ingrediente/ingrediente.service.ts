import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Ingrediente } from './ingrediente';
import { Observable } from 'rxjs/Observable';
import { NUTRITECH_API } from '../app.api'

@Injectable()
export class IngredienteService {

  constructor(private http: HttpClient) { }

  cadastrarIngrediente(ingrediente: Ingrediente): Observable<Ingrediente>{
    return this.http.post<Ingrediente>(NUTRITECH_API + '/ingredientes', ingrediente);
  }

  buscarIngredientes(): Observable<Ingrediente[]>{
    return this.http.get<Ingrediente[]>(NUTRITECH_API + '/ingredientes');
  }
}
