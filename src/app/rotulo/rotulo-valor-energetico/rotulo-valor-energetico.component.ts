import { Component, OnInit, Input } from '@angular/core';
import { Ftp } from '../../ftp/ftp';

@Component({
  selector: 'app-rotulo-valor-energetico',
  templateUrl: './rotulo-valor-energetico.component.html',
  styleUrls: ['./rotulo-valor-energetico.component.css']
})
export class RotuloValorEnergeticoComponent implements OnInit {

  @Input()
  ftp: Ftp

  @Input()
  nutrientesValorPorcao: any;

  @Input()
  numeroCasasDecimais: number;

  @Input()
  gramasPorPorcao: number;

  @Input()
  mostrarListaValorEnergetico: Boolean

  

  constructor() { }

  ngOnInit() {
    this.salvar();
  }

  somatorioTotal(): number {
    let soma: number = 0;
    
    this.nutrientesValorPorcao.forEach(item => {
      soma += item.valor * item.atributo.multiplicador;
    });

    return soma;
  }

  salvar() {
    console.log('output');
    console.log(this.nutrientesValorPorcao);
  }

}
