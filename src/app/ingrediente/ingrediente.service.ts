import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Ingrediente } from './ingrediente';
import { Observable } from 'rxjs/Observable';
import { NUTRITECH_API } from '../app.api'
import { IngredienteDto } from './ingrediente-dto';
import { ServiceBase } from '../shared/interfaces/service-base';

@Injectable()
export class IngredienteService implements ServiceBase {

  url = NUTRITECH_API + "/ingredientes";

  constructor(private http: HttpClient) { }

  cadastrarIngrediente(ingrediente: Ingrediente): Observable<IngredienteDto>{
    return this.http.post<IngredienteDto>(this.url, ingrediente);
  }

  atualizarIngrediente(ingrediente: Ingrediente): Observable<Ingrediente>{
    return this.http.put<Ingrediente>(`${this.url}/update`, ingrediente);
  }

  buscar(): Observable<Ingrediente[]>{
    return this.http.get<Ingrediente[]>(this.url);
  }

  obterIngrediente(id: string): Observable<Ingrediente>{
    return this.http.get<Ingrediente>(`${this.url}/${id}/`);
  }

  excluir(id: string): Observable<Ingrediente>{
    return this.http.delete<Ingrediente>(`${this.url}/${id}`)
  }
}
