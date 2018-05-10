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

  constructor(private router: Router, private loginService: LoginService) {
    this.router.events.subscribe(event => {
      if(event instanceof NavigationEnd) {
        this.usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));            


        console.log(this.usuarioLogado)
        if(this.usuarioLogado!==null) {
          if(this.usuarioLogado.tipo === TipoUsuario.ADMIN || 
            this.usuarioLogado.tipo === TipoUsuario.PROFESSOR){
              
            this.admin = true;
          } else {
            this.admin = false;
          }                  
        } else {
          // Comentada pois redirecionava para home quando acessava o cadastro sempre, ja que o usuario nunca estava logado
          // this.router.navigate(['./']);
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
