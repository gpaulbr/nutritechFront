import { Injectable } from '@angular/core';
import { NUTRITECH_API } from '../app.api';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../usuario/usuario';
import { Observable } from 'rxjs';

@Injectable()
export class LoginService {

  private url = NUTRITECH_API + "/auth";
  usuarioLogado: Usuario

  constructor(private http: HttpClient) { }

  setUsuario(user: Usuario) {
      this.usuarioLogado = user
  }

  getUsuario(){
      return this.usuarioLogado
  }

  efetuarLogin(usuario: Usuario): any{
    return this.http.post<any>(this.url + "/login", usuario);
  }
  
  efetuarLogout(): any{
    return this.http.get<any>(this.url + "/logout");
  }

  estaLogado(): boolean {
    return this.usuarioLogado !== undefined
  }
  
  esqueceuSenha(email: any): Observable<any> {  
    const parametros = {
      email: email
    }
    
    console.log(email);
    return this.http.post<any>(`${NUTRITECH_API}/usuarios/redefinir/${email}`, JSON.stringify(parametros));
  }
}
