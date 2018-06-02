import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-rotulo-valor-energetico',
  templateUrl: './rotulo-valor-energetico.component.html',
  styleUrls: ['./rotulo-valor-energetico.component.css']
})
export class RotuloValorEnergeticoComponent implements OnInit {

  @Input()
  nutrientesValorPorcao: any

  constructor() { 
    this.salvar();
  }

  ngOnInit() {
  }

  salvar() {
    console.log('output');
  }

}
