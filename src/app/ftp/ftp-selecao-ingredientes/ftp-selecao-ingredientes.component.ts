import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { Ingrediente } from '../../ingrediente/ingrediente';
import { IngredienteService } from '../../ingrediente/ingrediente.service';
import { ReceitaIngrediente } from '../ftp-receita-ingrediente';
import {Router} from '@angular/router';
import {Usuario} from '../../usuario/usuario';
import { UsuarioLogadoDto } from '../../usuario/usuario-logado-dto';

@Component({
  selector: 'app-ftp-selecao-ingredientes',
  templateUrl: './ftp-selecao-ingredientes.component.html',
  styleUrls: ['./ftp-selecao-ingredientes.component.css']
})
export class FtpSelecaoIngredientesComponent implements OnInit {

  ingrediente: Ingrediente = null;
  custoKg: number;
  fatorCorrecao: number;
  pesoG: number;
  receitaIngredientes: Array<ReceitaIngrediente>;
  ingredientesDisponiveis: Ingrediente[];
  usuarioLogado: UsuarioLogadoDto;

  constructor(private router: Router, private ingredienteService: IngredienteService) {
    this.receitaIngredientes = new Array<ReceitaIngrediente>();
   }

  @Output()
  salvarCusto = new EventEmitter<String>();
  @Output()
  salvarIngredientes = new EventEmitter<Array<ReceitaIngrediente>>();
  @Output()
  salvarPeso = new EventEmitter<Number>();
  @Input()
  obrigatorio: boolean;
  @Input()
  podeAlterar: boolean;

  ngOnInit() {
    this.usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
    if (this.usuarioLogado == null) {
      this.router.navigate(['./']);
      return;
    }

    this.custoKg = 0;
    this.fatorCorrecao = 100;
    this.pesoG = 0;

    this.loadDB();
  }

  loadDB() {
    this.ingredienteService.buscar().subscribe(
      response => { 
        let lista = []

        response['Ingredientes'].forEach(p => {
          if(this.usuarioLogado.tipo === "ADMIN" 
          || p.tipo === "COMUM"
          || p.criador.id === this.usuarioLogado.id) {
            lista.push(p)
          }
        });
        this.ingredientesDisponiveis = lista;
      });
  }

  adicionarIngrediente() {
    // console.log (this.receitaIngredientes)
    let novo: ReceitaIngrediente = new ReceitaIngrediente();
    delete this.ingrediente.criador['valid'];
    novo.ingrediente = this.ingrediente;
    novo.custoKg = this.custoKg;
    novo.pesoG = this.pesoG;
    novo.fatorCorrecao = this.fatorCorrecao;

    if (this.ingrediente != null && !this.estaIncluido(novo.ingrediente)) {
      this.receitaIngredientes.push(novo);
      // console.log('Adicionado: ' + this.ingrediente + ' à lista: ' + this.receitaIngredientes);
      this.ingrediente = null;
      this.custoKg = 0;
      this.fatorCorrecao = 100;
      this.pesoG = 0;
      this.salvar();
    } else {
    }
  }

  podeIncluirIngrediente() {
    if (this.ingrediente != null && this.custoKg > 0 && this.fatorCorrecao >= 0 && this.fatorCorrecao <= 100 && this.pesoG > 0) {
      return true;
    } else {
      return false;
    }
  }

  estaIncluido(ingrediente: Ingrediente) {
    let incluido = false;
    this.receitaIngredientes.forEach(ri => {
      if (ri.ingrediente.nome === ingrediente.nome) {
        incluido = true;
      }
    });
    return incluido;
  }

  removerIngredientePorIndex(index: number) {
    this.receitaIngredientes.splice(index, 1);
    this.salvar();
  }

  criarNovoIngrediente() {
    console.log('Temporariamente apenas redireciona.');
    this.router.navigate(['./ingrediente']);
  }

  getCustoTotal(): String {
    let total = 0;
    for (const item of this.receitaIngredientes) {
      total = total + Number(item.getCustoTotal());
    }
    return String(total.toFixed(2));
  }

  getPesoTotal(): Number {
    let total = 0;
    for (const item of this.receitaIngredientes) {
      total = total + Number(item.pesoG);
    }
    return Number(total.toFixed(2));
  }

  salvar () {
    this.salvarIngredientes.emit(this.receitaIngredientes);
    this.salvarCusto.emit(this.getCustoTotal());
    this.salvarPeso.emit(this.getPesoTotal());
  }

}
