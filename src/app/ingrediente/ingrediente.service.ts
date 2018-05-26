import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Ingrediente } from './ingrediente';
import { Observable } from 'rxjs/Observable';
import { NUTRITECH_API } from '../app.api'
import { IngredienteDto } from './ingrediente-dto';

@Injectable()
export class IngredienteService {

  constructor(private http: HttpClient) { }

  cadastrarIngrediente(ingrediente: Ingrediente): Observable<IngredienteDto>{
    return this.http.post<IngredienteDto>(NUTRITECH_API + '/ingredientes', ingrediente);
  }

  atualizarIngrediente(ingrediente: Ingrediente): Observable<Ingrediente>{
    return this.http.put<Ingrediente>(NUTRITECH_API + '/ingredientes/update', ingrediente);
  }

  buscarIngredientes(): Observable<Ingrediente[]>{
    return this.http.get<Ingrediente[]>(NUTRITECH_API + '/ingredientes');
  }

  obterIngrediente(id: string): Observable<Ingrediente>{
    return this.http.get<Ingrediente>(`${NUTRITECH_API}/ingredientes/${id}/`);
  }

  excluirIngrediente(id: string): Observable<Ingrediente>{
    return this.http.delete<Ingrediente>(`${NUTRITECH_API}/ingredientes/${id}`)
  }
}
