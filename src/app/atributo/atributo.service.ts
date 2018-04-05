import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Atributo } from './atributo';
import { Observable } from 'rxjs/Observable';
import { Usuario } from '../usuario/usuario';
import { NUTRITECH_API } from '../app.api'

@Injectable()
export class AtributoService {

  constructor(private http: HttpClient) { }

  salvarAtributo(atributo: Atributo): Observable<Atributo>{
    console.log(atributo)
    return null;
    // return this.http.post<Atributo>(NUTRITECH_API + '/atributos', atributo);
  }

  buscarAtributos(): Observable<Atributo[]>{
    return this.http.get<Atributo[]>(NUTRITECH_API + '/atributos');
  }

}
