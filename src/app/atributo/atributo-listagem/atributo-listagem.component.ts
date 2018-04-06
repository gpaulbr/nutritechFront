import { Component, OnInit } from '@angular/core';
import { AtributoService } from '../atributo.service';
import { Response } from '@angular/http/src/static_response';
import { Router } from '@angular/router';
import { Atributo } from '../atributo';

@Component({
  selector: 'app-atributo-listagem',
  templateUrl: './atributo-listagem.component.html',
  styleUrls: ['./atributo-listagem.component.css']
})
export class AtributoListagemComponent implements OnInit {

  atributos: Atributo[];

  constructor(
    private atributoService: AtributoService,
    private router: Router) {
   }

  ngOnInit() {
    var usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
    if(usuarioLogado == null) {
      // this.router.navigate(['./']);
    }
    this.atributoService.buscarAtributos().subscribe(
      response => {
        this.atributos = response.Atributos;
        console.log (this.atributos);
      }
    )
  }
}
