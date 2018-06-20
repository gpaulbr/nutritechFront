import { Component, OnInit, Input } from '@angular/core';
import { Ftp } from '../../ftp/ftp';
import { Atributo } from '../../atributo/atributo';

@Component({
  selector: 'app-rotulo-info-nutricional',
  templateUrl: './rotulo-info-nutricional.component.html',
  styleUrls: ['./rotulo-info-nutricional.component.css']
})
export class RotuloInfoNutricionalComponent {

  @Input()
  ftp: Ftp;

  @Input()
  mostrarInfoNutricional: boolean;

  @Input()
  gramasPorPorcao: number;

  @Input()
  numeroCasasDecimais: number;

  @Input()
  valorEnergeticoPorcao: any;

  constructor() { }

  calculoVDPerc(valor: number, atributo: Atributo): number {
    const vd = atributo.valorDiario;
    return vd === 0 ? 0 : valor / vd * 100;
  }

  definirTextoAlergenico() {
    return `Contém os alergênicos ${this.ftp.receitaIngrediente.map(ri => ri.ingrediente.alergenico).join(', ')}`;
  }
}
