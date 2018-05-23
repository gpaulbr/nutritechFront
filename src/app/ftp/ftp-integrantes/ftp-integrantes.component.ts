import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { Usuario } from '../../usuario/usuario';
import { UsuarioService } from '../../usuario/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ftp-integrantes',
  templateUrl: './ftp-integrantes.component.html',
  styleUrls: ['./ftp-integrantes.component.css']
})
export class FtpIntegrantesComponent implements OnInit {

  usuario: Usuario = null;
  integrantes = new Array<Usuario>();

  alunosDisponiveis: Usuario[];

  constructor(private router: Router, private usuarioService: UsuarioService) { }

  @Output()
  salvarIntegrantes = new EventEmitter<Array<Usuario>>();
  @Input()
  obrigatorio: boolean

  ngOnInit() {
    var usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
    if(usuarioLogado == null) {
      this.router.navigate(['./']);
      return;
    }

    this.loadDB();
  }

  loadDB() {
    this.usuarioService.buscarAlunos().subscribe(
      response => {
        this.alunosDisponiveis = response['Usuarios'];
        this.alunosDisponiveis.forEach(item => {
          delete item.senha
          delete item["valid"];
        });
        console.log(this.alunosDisponiveis);
      }
    )
  }

  adicionarIntegrante() {
    if(this.usuario != null && !this.integrantes.includes(this.usuario)) {
      this.integrantes.push(this.usuario);
      console.log("Adicionado: " + this.usuario + " à lista: " + this.integrantes);
      this.usuario = null;
      this.salvar();
    }
  }

  removerIntegrantePorIndex(index : number) {
    this.integrantes.splice(index, 1)
    this.salvar();
  }

  removerIntegrantePorUser(user : Usuario) {
    var index = this.integrantes.indexOf(user)
    this.integrantes.splice(index, 1)
    this.salvar();
  }

  salvar () {
    this.salvarIntegrantes.emit(this.integrantes);
  }

}
