import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Ingrediente } from './ingrediente';
import { Observable } from 'rxjs/Observable';
import { NUTRITECH_API } from '../app.api'
import { IngredienteDto } from './ingrediente-dto';

@Injectable()
export class IngredienteService {

  constructor(private http: HttpClient) { }

  cadastrarIngrediente(ingrediente: IngredienteDto): Observable<IngredienteDto>{
    return this.http.post<IngredienteDto>(NUTRITECH_API + '/ingredientes', ingrediente);
  }

  buscarIngredientes(): Observable<Ingrediente[]>{
    return this.http.get<Ingrediente[]>(NUTRITECH_API + '/ingredientes');
  }

  obterIngrediente(id: string): Observable<Ingrediente>{
    return this.http.get<Ingrediente>(`${NUTRITECH_API}/ingredientes/${id}/`);
  }
}
