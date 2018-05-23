import { Injectable } from '@angular/core';
import { NUTRITECH_API } from '../app.api';
import { HttpClient } from '@angular/common/http';
import { Grupo } from './grupo';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class GrupoService {

  private url = NUTRITECH_API + "/grupos";

  constructor(private http: HttpClient) { }

  salvarGrupo(grupo: Grupo): Observable<Grupo>{
    return this.http.post<Grupo>(this.url, grupo);
  }

  editarGrupo(grupo: Grupo): Observable<Grupo>{
    console.log(this.url + "/update" + grupo);
    return this.http.put<Grupo>(this.url + "/update", grupo);
  }

  buscarGrupos(): Observable<Grupo[]>{
    return this.http.get<Grupo[]>(this.url);
  }

  obterGrupo(id: string): Observable<Grupo>{
    return this.http.get<Grupo>(`${NUTRITECH_API}/grupos/${id}/`);
  }

  excluirGrupo(id: Number): Observable<any> {
    return this.http.delete<any>(`${NUTRITECH_API}/grupos/${id}/`);
  }

}
