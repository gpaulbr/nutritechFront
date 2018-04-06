import { Component, OnInit } from '@angular/core';
import { GrupoReceita } from '../../ingrediente/grupo-receita';
import { Grupo } from '../grupo';
import { GrupoService } from '../grupo.service';
import { Response } from '@angular/http/src/static_response';
import { Router } from '@angular/router';

@Component({
  selector: 'app-grupo-listagem',
  templateUrl: './grupo-listagem.component.html',
  styleUrls: ['./grupo-listagem.component.css']
})
export class GrupoListagemComponent implements OnInit {

  grupos: Grupo[];

  constructor(
    private grupoService: GrupoService,
    private router: Router) {
   }

  ngOnInit() {
    var usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
    if(usuarioLogado == null) {
      // this.router.navigate(['./']);
    }
    this.grupoService.buscarGrupos().subscribe(
      response => {
        this.grupos = response.Grupos;
        console.log (this.grupos);
      }
    )
  }
}
