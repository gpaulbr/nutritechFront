import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Atributo } from './atributo';
import { Observable } from 'rxjs/Observable';
import { Usuario } from '../usuario/usuario';
import { NUTRITECH_API } from '../app.api'
import { ServiceBase } from '../shared/interfaces/service-base';

@Injectable()
export class AtributoService implements ServiceBase {

  url = NUTRITECH_API + "/atributos";

  constructor(private http: HttpClient) { }

  salvarAtributo(atributo: Atributo): Observable<Atributo>{
    return this.http.post<Atributo>(NUTRITECH_API + '/atributos', atributo);
  }

  buscar(): Observable<Atributo[]>{
    return this.http.get<Atributo[]>(NUTRITECH_API + '/atributos/ativos');
  }

  editarAtributo(atributo: Atributo): Observable<Atributo>{
    console.log(this.url + "/update" + atributo);
    return this.http.put<Atributo>(this.url + "/update", atributo);
  }

  excluir(id: string): Observable<Atributo> {
    return this.http.delete<any>(`${NUTRITECH_API}/atributos/${id}/`);
  }

  obterAtributo(id: string): Observable<Atributo>{
    return this.http.get<Atributo>(`${NUTRITECH_API}/atributos/${id}/`);
  }
}
