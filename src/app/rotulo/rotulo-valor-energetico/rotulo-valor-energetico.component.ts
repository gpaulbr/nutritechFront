import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Ftp } from '../../ftp/ftp';
import { Atributo } from '../../atributo/atributo';
import { isNgTemplate } from '@angular/compiler';

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

  @Output()
  outputValorEnergetico = new EventEmitter<Array<any>>();

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

  getList(): Array<any> {
    let array = new Array<any>();
    let novo: {
      atributo: Atributo,
      valor: number
    }

    this.nutrientesValorPorcao.forEach(item => {
      novo = {
        atributo: item.atributo,
        valor: item.valor * item.atributo.multiplicador
      }
      array.push(novo);
    });

    return array;
  }

  salvar() {
    this.outputValorEnergetico.emit(this.getList());
  }

}
