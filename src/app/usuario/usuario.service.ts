import { Injectable, Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from './usuario';
import { Observable } from 'rxjs/Observable';
import { NUTRITECH_API } from '../app.api'

@Injectable()
export class UsuarioService {

  private url = NUTRITECH_API + "/usuarios";

  constructor(private http: HttpClient) { }

  salvarUsuario(usuario: Usuario): Observable<Usuario>{
    return this.http.post<Usuario>(this.url, usuario);
  }

  buscarUsuarios(): Observable<Usuario[]>{
    return this.http.get<Usuario[]>(this.url);
  }

  buscarProfessores(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.url + "/professores")
  }

  buscarAlunos(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.url + "/alunos")
  }

  buscarUsuario(index: Number): Observable<Usuario> {
    return this.http.get<Usuario>(this.url + '/' + index);
  } 
}
