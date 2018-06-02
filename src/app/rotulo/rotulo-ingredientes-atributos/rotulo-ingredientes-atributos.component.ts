import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Ftp } from '../../ftp/ftp';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FtpService } from '../../ftp/ftp.service';
import { AtributoService } from '../../atributo/atributo.service';
import { Atributo } from '../../atributo/atributo';
import { ReceitaIngrediente } from '../../ftp/ftp-receita-ingrediente';
import { IngredienteAtributo } from '../../ingrediente/ingrediente-atributo';
import { Ingrediente } from '../../ingrediente/ingrediente';
import { IngredienteAtributoDto } from '../../ingrediente/ingrediente-atributo-dto';

@Component({
  selector: 'app-rotulo-ingredientes-atributos',
  templateUrl: './rotulo-ingredientes-atributos.component.html',
  styleUrls: ['./rotulo-ingredientes-atributos.component.css']
})
export class RotuloIngredientesAtributosComponent implements OnInit {

  @Input()
  ftp: Ftp;

  @Input()
  todosAtributos: Array<Atributo>;

  @Input()
  gramasPorPorcao?: number;

  @Input()
  numeroCasasDecimais: number;

  @Input()
  ingredienteValorPorcao: any;

  @Input()
  mostrarListasIngredientesAtributos: Boolean;

  @Input()
  qntdeEmGramas: number;

  @Input()
  aplicarMultiplicador: boolean;

  @Output()
  outputNutrientesValorPorcao = new EventEmitter<any>(); // Se descobrir como faz sem o any, me avisa leonardo.marcelino@outlook.com

  constructor() { }

  ngOnInit() {
    this.salvar();
  }

  /*
   * Dados
   */
  ingredientes(): Array<ReceitaIngrediente> {
    if(this.ftp !== undefined && this.ftp.receitaIngrediente !== undefined) {
      return this.ftp.receitaIngrediente;
    }
    return Array<ReceitaIngrediente>();
  }

  ingrediente(index: number): ReceitaIngrediente {
    if (index >= this.ingredientes().length || index < 0) {
      return null;
    } else {
      return this.ingredientes()[index];
    }
  }

  atributos(): Array<Atributo> {
    if(this.todosAtributos !== undefined) {
      return this.todosAtributos;
    }
    return Array<Atributo>();
  }

  atributo(index: number): Atributo {
    if (index >= this.atributos().length || index < 0) {
      return null;
    } else {
      return this.atributos()[index];
    }
  }

  ingredienteAtributo(ingrediente: Ingrediente, atributo: Atributo): IngredienteAtributoDto {
    let resultado: IngredienteAtributoDto = null;
    let ingredienteAtributos = ingrediente.ingredienteAtributo as Array<IngredienteAtributoDto>;
    ingredienteAtributos.forEach(item => {
      //console.log(atributo.id + ' vs ' + item.atributo.id)
      if (atributo.id === item.atributo.id) {
        resultado = item;
      }
    });
    return resultado;
  }

  pesoIngredientePorPorcao(receitaIngrediente: ReceitaIngrediente, gramasPorPorcao?: number) {
    return receitaIngrediente.pesoG * gramasPorPorcao / Number(this.ftp.peso);
  }

  valorNutricional(atributo: Atributo, receitaIngrediente: ReceitaIngrediente, aplicarMultiplicador: Boolean): number {
    return (aplicarMultiplicador ? atributo.multiplicador : 1) * Number(this.ingredienteAtributo(receitaIngrediente.ingrediente, atributo).valor) * this.pesoIngredientePorPorcao(receitaIngrediente, this.gramasPorPorcao) / this.qntdeEmGramas
  }

  getList(): any  {
    let output = new Array<{atributo: Atributo, valor: number}>();
    this.todosAtributos.forEach(atributo => {
      let novo: {atributo: Atributo, valor: number}
      let soma: number = 0;
      this.ingredientes().forEach(receitaIngrediente => {
        let valorNutricional = this.valorNutricional(atributo, receitaIngrediente, this.aplicarMultiplicador);
        soma += valorNutricional;
      });
      novo = {atributo: atributo, valor: soma }
      output.push(novo);
    });
    return output;
    //console.log(output);
    //this.outputNutrientesValorPorcao.emit(output);
  }

  salvar() {
    let lista = this.getList();
    this.outputNutrientesValorPorcao.emit(lista);
    console.log(lista);
  }
}
