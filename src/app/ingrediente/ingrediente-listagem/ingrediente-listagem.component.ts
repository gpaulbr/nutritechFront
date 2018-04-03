import { Component, OnInit } from '@angular/core';
import { Ingrediente } from '../ingrediente';
import { IngredienteService } from '../ingrediente.service';

@Component({
  selector: 'app-ingrediente-listagem',
  templateUrl: './ingrediente-listagem.component.html',
  styleUrls: ['./ingrediente-listagem.component.css']
})
export class IngredienteListagemComponent implements OnInit {

  ingredientes: Ingrediente[];

  constructor(
    private ingredienteService: IngredienteService
  ) { }

  ngOnInit() {
    this.ingredienteService.buscarIngredientes().subscribe(
      response => { 
        this.ingredientes = response.Ingredientes;
        console.log(this.ingredientes);
      });
  }

}
