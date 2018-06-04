import { Component, OnInit, Input } from '@angular/core';
import { Ftp } from '../../ftp/ftp';
import { Atributo } from '../../atributo/atributo';

@Component({
  selector: 'app-rotulo-info-nutricional',
  templateUrl: './rotulo-info-nutricional.component.html',
  styleUrls: ['./rotulo-info-nutricional.component.css']
})
export class RotuloInfoNutricionalComponent implements OnInit {

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

  ngOnInit() {
  }

  valorVD(atributo: Atributo): number {
    switch (atributo.nome.toLocaleLowerCase()) {
      case 'Valor energético (kcal)'.toLocaleLowerCase():
        return 2000;
      case 'Carboidratos'.toLocaleLowerCase():
        return 300;
      case 'Proteínas'.toLocaleLowerCase():
        return 75;
      case 'Gorduras totais'.toLocaleLowerCase():
        return 55;
      case 'Gorduras saturadas'.toLocaleLowerCase():
        return 22;
      case 'Gorduras trans'.toLocaleLowerCase():
        return 0; // não há valor
      case 'Fibra alimentar'.toLocaleLowerCase():
        return 25;
      case 'Sódio'.toLocaleLowerCase():
        return 2400;
      case 'Valor energético (kJ)'.toLocaleLowerCase():
        return 8400;
      default:
        return ;
    }
  }

  calculoVDPerc(valor: number, atributo: Atributo): number {
    const vd = this.valorVD(atributo);
    if (vd === 0) {
      return 0;
    } else {
      return valor / vd * 100;
    }
  }

  

}
