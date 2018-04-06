import { Component, OnInit } from '@angular/core';
import { GrupoReceita } from '../../ingrediente/grupo-receita';
import { Grupo } from '../grupo';
import { GrupoService } from '../grupo.service';
import { Response } from '@angular/http/src/static_response';

@Component({
  selector: 'app-grupo-listagem',
  templateUrl: './grupo-listagem.component.html',
  styleUrls: ['./grupo-listagem.component.css']
})
export class GrupoListagemComponent implements OnInit {

  grupos: Grupo[];

  constructor(private grupoService: GrupoService) {
   }

  ngOnInit() {
    this.grupoService.buscarGrupos().subscribe(
      response => {
        this.grupos = response;
        console.log (this.grupos);
      }
    )
  }
}
