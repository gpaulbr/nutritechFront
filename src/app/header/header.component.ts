import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Usuario } from '../usuario/usuario';
import { TipoUsuario } from '../usuario/tipo-usuario.enum';
import { LoginService } from '../login/login.service';
import { FtpListagemComponent } from '../ftp/ftp-listagem/ftp-listagem.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  usuarioLogado: Usuario;
  admin: boolean = false;
  nickname: string = "";


  constructor(private router: Router, private loginService: LoginService) {
    this.router.events.subscribe(event => {
      if(event instanceof NavigationEnd) {
        this.usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));            
       
        if(this.usuarioLogado!==null) {
          this.nickname = this.usuarioLogado.nome;
          if(this.usuarioLogado.tipo === TipoUsuario.ADMIN || 
            this.usuarioLogado.tipo === TipoUsuario.PROFESSOR){
              
            this.admin = true;
          } else {
            this.admin = false;
          }                  
        }      
      }
    })
  }

  ngOnInit(){
  }

  estaLogado(){
    return JSON.parse(localStorage.getItem('usuarioLogado')) != null;
  }

  logout(){
    localStorage.clear();
    this.router.navigate(['./']);
  }
}
