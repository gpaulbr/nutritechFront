import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../usuario';
import { UsuarioService } from '../usuario.service';

@Component({
  selector: 'app-usuario-listagem',
  templateUrl: './usuario-listagem.component.html',
  styleUrls: ['./usuario-listagem.component.css']
})
export class UsuarioListagemComponent implements OnInit {

  usuarios: Usuario[]
  constructor(private router: Router,
    private usuarioService: UsuarioService) { }

  ngOnInit() {
    var usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
    if(usuarioLogado == null) {  
      this.router.navigate(['./']);
    }
    this.usuarioService.buscarUsuarios().subscribe(
      response => {
        this.usuarios = response['Usuarios'];
        console.log (this.usuarios);
      }
    )
  }

}
