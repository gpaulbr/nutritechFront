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
  professor: boolean = false;
  nickname: string = "";
  mobile: boolean = false;
  normal: boolean = false;


  constructor(private router: Router, private loginService: LoginService) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
        if (this.usuarioLogado !== null) {
          this.nickname = this.usuarioLogado.nome;
          // precisa atualizar a página para trocar nome do usuário
          if(screen.width < 321 || screen.width < 800 || screen.width < 1025 ){
              this.nickname = this.nickname.charAt(0);
              this.mobile = true;
          }
          else {this.normal = true;}

          if (this.usuarioLogado.tipo === TipoUsuario.ADMIN) {

            this.admin = true;
          } else {
            this.admin = false;
          }
          if (this.usuarioLogado.tipo === TipoUsuario.PROFESSOR) {
            this.professor = true;
          } else {
            this.professor = false;
          }
        }
      }
    })
  }

  ngOnInit() {
  }

  estaLogado() {
    return JSON.parse(localStorage.getItem('usuarioLogado')) != null;
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['./']);
  }
}
