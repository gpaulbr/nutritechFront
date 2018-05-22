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

  buscarGrupos(): Observable<Grupo[]>{
    return this.http.get<Grupo[]>(this.url);
  }

  obterGrupo(id: string): Observable<Grupo>{
    return this.http.get<Grupo>(`${NUTRITECH_API}/grupos/${id}/`);
  }

  

}
