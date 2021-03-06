import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Atributo } from './atributo';
import { Observable } from 'rxjs/Observable';
import { Usuario } from '../usuario/usuario';
import { NUTRITECH_API } from '../app.api'

@Injectable()
export class AtributoService {

  private url = NUTRITECH_API + "/atributos";

  constructor(private http: HttpClient) { }

  salvarAtributo(atributo: Atributo): Observable<Atributo>{
    return this.http.post<Atributo>(NUTRITECH_API + '/atributos', atributo);
  }

  buscarAtributos(): Observable<Atributo[]>{
    return this.http.get<Atributo[]>(NUTRITECH_API + '/atributos/ativos');
  }

  editarAtributo(atributo: Atributo): Observable<Atributo>{
    console.log(this.url + "/update" + atributo);
    return this.http.put<Atributo>(this.url + "/update", atributo);
  }

  excluirAtributo(id: number): Observable<any> {
    return this.http.delete<any>(`${NUTRITECH_API}/atributos/${id}/`);
  }


  obterAtributo(id: string): Observable<Atributo>{
    return this.http.get<Atributo>(`${NUTRITECH_API}/atributos/${id}/`);
  }



}
