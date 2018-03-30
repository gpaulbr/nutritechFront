import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Ingrediente } from './ingrediente';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class IngredienteService {

  private url = "http://localhost:8080/api/ingredientes";

  constructor(private http: HttpClient) { }

  salvarIngrediente(ingrediente: Ingrediente): Observable<Ingrediente>{
    return this.http.post<Ingrediente>(this.url, ingrediente);
  }

  buscarIngredientes(): Observable<Ingrediente[]>{
    return this.http.get<Ingrediente[]>(this.url);
  }

}
