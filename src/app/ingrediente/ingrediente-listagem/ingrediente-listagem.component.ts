import { Component, OnInit } from '@angular/core';
import { Ingrediente } from '../ingrediente';
import { IngredienteService } from '../ingrediente.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ingrediente-listagem',
  templateUrl: './ingrediente-listagem.component.html',
  styleUrls: ['./ingrediente-listagem.component.css']
})
export class IngredienteListagemComponent implements OnInit {

  ingredientes: Ingrediente[];

  constructor(
    private router: Router,
    private ingredienteService: IngredienteService) { }

  ngOnInit() {
    var usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
    if(usuarioLogado == null) {
      this.router.navigate(['./']);
    }
    this.ingredienteService.buscarIngredientes().subscribe(
      response => { 
       this.ingredientes = response['Ingredientes'];
        console.log(this.ingredientes);
      });
  }

}
