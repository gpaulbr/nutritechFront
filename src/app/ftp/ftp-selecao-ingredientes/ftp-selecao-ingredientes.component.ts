import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { Ingrediente } from '../../ingrediente/ingrediente';
import { IngredienteService } from '../../ingrediente/ingrediente.service';
import { ReceitaIngrediente } from '../ftp-receita-ingrediente';
import {Router} from '@angular/router';
import {Usuario} from '../../usuario/usuario';

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
  receitaIngredientes = new Array<ReceitaIngrediente>();

  ingredientesDisponiveis: Ingrediente[];

  constructor(private router: Router, private ingredienteService: IngredienteService) { }

  @Output()
  salvarCusto = new EventEmitter<String>();
  @Output()
  salvarIngredientes = new EventEmitter<Array<ReceitaIngrediente>>();
  @Input()
  obrigatorio: boolean

  ngOnInit() {
    const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
    if (usuarioLogado == null) {
      this.router.navigate(['./']);
      return;
    }

    this.custoKg = 0;
    this.fatorCorrecao = 100;
    this.pesoG = 0;

    this.loadDB();
  }

  loadDB() {
    this.ingredienteService.buscarIngredientes().subscribe(
      response => {
        this.ingredientesDisponiveis = Array.from(response['Ingredientes']);
        this.ingredientesDisponiveis.forEach(item => {
       // delete item['Ingrediente'].criador.senha;
        });
        // console.log(this.ingredientesDisponiveis);
      }
    );
  }

  adicionarIngrediente() {
    // console.log (this.receitaIngredientes)
    let novo: ReceitaIngrediente = new ReceitaIngrediente()
    delete this.ingrediente.criador['valid']
    novo.ingrediente = this.ingrediente;
    novo.custoKg = this.custoKg;
    novo.pesoG = this.pesoG;
    novo.fatorCorrecao = this.fatorCorrecao;

    if (this.ingrediente != null && !this.estaIncluido(novo.ingrediente)) {
      this.receitaIngredientes.push(novo);
      // console.log('Adicionado: ' + this.ingrediente + ' à lista: ' + this.receitaIngredientes);
      this.ingrediente = null;
      this.salvar();
    } else {
      // console.log('Nada selecionado')
    }
    // console.log (this.receitaIngredientes)
  }

  estaIncluido(ingrediente: Ingrediente) {
    let incluido = false;
    this.receitaIngredientes.forEach(ri => {
      if (ri.ingrediente.nome == ingrediente.nome) {
        incluido = true;
      }
    });
    return incluido;
  }

  removerIngredientePorIndex(index: number) {
    this.receitaIngredientes.splice(index, 1)
    this.salvar();
  }

  criarNovoIngrediente() {
    console.log('Não implementado');
  }

  getCustoTotal(): String {
    let custoTotal = 0;
    for (const item of this.receitaIngredientes) {
      custoTotal = custoTotal + Number(item.getCustoTotal());
    }
    return String(custoTotal.toFixed(2));
  }

  salvar () {
    this.salvarIngredientes.emit(this.receitaIngredientes);
    this.salvarCusto.emit(this.getCustoTotal());
  }

}
