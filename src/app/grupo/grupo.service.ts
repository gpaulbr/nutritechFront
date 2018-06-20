import { Injectable } from '@angular/core';
import { NUTRITECH_API } from '../app.api';
import { HttpClient } from '@angular/common/http';
import { Grupo } from './grupo';
import { Observable } from 'rxjs/Observable';
import { ServiceBase } from '../shared/interfaces/service-base';

@Injectable()
export class GrupoService extends ServiceBase {

  url = NUTRITECH_API + "/grupos";

  constructor(private http: HttpClient) {
    super();
   }

  salvarGrupo(grupo: Grupo): Observable<Grupo>{
    return this.http.post<Grupo>(this.url, grupo);
  }

  editarGrupo(grupo: Grupo): Observable<Grupo>{
    console.log(grupo);/*está inserindo novo */
    return this.http.put<Grupo>(this.url + "/update", grupo);
  }

  buscar(): Observable<Grupo[]>{
    return this.http.get<Grupo[]>(`${this.url}/ativos`);
  }

  obterGrupo(id: string): Observable<Grupo>{
    return this.http.get<Grupo>(`${NUTRITECH_API}/grupos/${id}/`);
  }

  excluir(id: string): Observable<any> {
    return this.http.delete<any>(`${NUTRITECH_API}/grupos/${id}/`);
  }

}
