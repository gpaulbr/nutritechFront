import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Atributo } from './atributo';
import { Observable } from 'rxjs/Observable';
import { Usuario } from '../usuario/usuario';

@Injectable()
export class AtributoService {

  private url = "http://localhost:8080/atributos";

  constructor(private http: HttpClient) { }

  salvarAtributo(atributo: Atributo): Observable<Atributo>{
    return this.http.post<Atributo>(this.url, atributo);
  }

  buscarAtributos(): Observable<Atributo[]>{
    return this.http.get<Atributo[]>(this.url);
  }

}
