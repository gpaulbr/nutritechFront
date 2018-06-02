import { Component, OnInit, Input } from '@angular/core';
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

  ftp: Ftp;
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

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private ftpService: FtpService,
    private atributeService: AtributoService,
  ) {
    let receita;
    this.route.params.subscribe(params => receita = params);

    if (receita.id !== undefined && this.ftp === undefined) {
      this.ftpService.obterFTP(receita.id)
        .subscribe(res => {
          this.ftp = res;
          this.ftp.receitaIngrediente.sort((a, b) => {
            if (a.pesoG == b.pesoG) {
              if (a.ingrediente.nome.toLowerCase() < b.ingrediente.nome.toLowerCase()) return -1;
              if (a.ingrediente.nome.toLowerCase() > b.ingrediente.nome.toLowerCase()) return 1;
            }
            if (a.pesoG < b.pesoG) return 1;
            if (a.pesoG > b.pesoG) return -1;
          })
        });
    }

    this.atributeService.buscarAtributos().subscribe(response => {
      this.todosAtributos = Array.from(response['Atributos']) as Array<Atributo>;
      this.todosAtributos.sort((a, b) => {
        if (a.id < b.id) return -1;
        if (a.id > b.id) return 1;
      });
    });
  }

  ngOnInit() {
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

  valorParaUmaPorcao(atributo: Atributo, receitaIngrediente: ReceitaIngrediente): number {
    return Number(this.ingredienteAtributo(receitaIngrediente.ingrediente, atributo).valor) * this.pesoIngredientePorPorcao(receitaIngrediente, this.gramasPorPorcao) / this.qntdeEmGramas
  }
}
