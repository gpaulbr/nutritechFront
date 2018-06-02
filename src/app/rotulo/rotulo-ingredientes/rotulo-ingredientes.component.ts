import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Ftp } from '../../ftp/ftp';
import { Ingrediente } from '../../ingrediente/ingrediente';
import { ReceitaIngrediente } from '../../ftp/ftp-receita-ingrediente';
import { AtributoService } from '../../atributo/atributo.service';
import { Atributo } from '../../atributo/atributo';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FtpService } from '../../ftp/ftp.service';
import { IngredienteService } from '../../ingrediente/ingrediente.service';

@Component({
  selector: 'app-rotulo-ingredientes',
  templateUrl: './rotulo-ingredientes.component.html',
  styleUrls: ['./rotulo-ingredientes.component.css']
})
export class RotuloIngredientesComponent implements OnInit {

  ftp: Ftp;

  @Input()
  gramasPorPorcao?: number;
  
  @Input()
  numeroCasasDecimais: number = 3;

  @Input()
  mostrarListaIngredientes: boolean = false;

  @Output()
  outputIngredienteValorPorcao = new EventEmitter<any>(); // Se descobrir como faz sem o any, me avisa leonardo.marcelino@outlook.com


  // Temporariamente isto está aqui
  msgValoresDiarios: String = "(*)% Valores Diários de referência com base em uma dieta de 2.000 kcal ou 8400 kJ. Seus valoers diários podem ser maiores ou menores dependendo de suas necessidades energéticas."

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
          this.alterar();
        });
    }
  }

  ngOnInit() {
    const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
    if (usuarioLogado == null) {  // só libera após login
      return;
    }
  }

  /*
   * Dados
   */

  ingredientes(): Array<ReceitaIngrediente> {
    if (this.ftp !== undefined) {
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

  /*
   * Cálculos
   */
  pesoIngredienteXReceitaTotal(ingrediente: ReceitaIngrediente, gramasPorPorcao?: number) {
    let pesoTotal = Number(this.ftp.peso) as number;
    if(gramasPorPorcao != null) {
      ingrediente.pesoG * gramasPorPorcao / pesoTotal
    }
  }

  pesoTotalPorPorcao(gramasPorPorcao?: number) {
    if (gramasPorPorcao != null) {
      return gramasPorPorcao;
    } else {
      let pesoTotal = (Number(this.ftp.peso)) as number
      return (Number(pesoTotal)/Number(this.ftp.rendimento)) as number;
    }
  }

  pesoIngredientePorPorcao(ingrediente: ReceitaIngrediente, gramasPorPorcao?: number) {
    return ingrediente.pesoG * gramasPorPorcao / Number(this.ftp.peso);
  }

  totalIngredientePorPorcao(gramasPorPorcao?: number): number {
    let soma: number = 0;
    this.ftp.receitaIngrediente.forEach(item => {
      soma += this.pesoIngredientePorPorcao(item, gramasPorPorcao);
    });
    return soma;
  }

  alterar() {
    let output = new Array<any>();
    this.ingredientes().forEach(item => {
      let novo: any = {ingrediente: item.ingrediente, valor: this.pesoIngredientePorPorcao(item, this.gramasPorPorcao) };
      output.push(novo);
    });
    //console.log(output);
    this.outputIngredienteValorPorcao.emit(output);
  }
}
