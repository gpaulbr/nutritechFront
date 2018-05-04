import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { Ingrediente } from '../../ingrediente/ingrediente';
import { IngredienteService } from '../../ingrediente/ingrediente.service';
import { ReceitaIngrediente } from '../ftp-receita-ingrediente';

@Component({
  selector: 'app-ftp-selecao-ingredientes',
  templateUrl: './ftp-selecao-ingredientes.component.html',
  styleUrls: ['./ftp-selecao-ingredientes.component.css']
})
export class FtpSelecaoIngredientesComponent implements OnInit {

  ingrediente: Ingrediente = null;
  custoKG: Number = 0.00;
  pesoG: Number = 0;
  ingredientes = new Array<ReceitaIngrediente>();

  ingredientesDisponiveis: Ingrediente[];

  constructor(private ingredienteService: IngredienteService) { }

  @Output()
  salvarIngredientes = new EventEmitter<Array<ReceitaIngrediente>>();
  @Input()
  obrigatorio: boolean
  
  ngOnInit() {
    this.loadDB();
  }

  loadDB() {
    this.ingredienteService.buscarIngredientes().subscribe(
      response => {
        this.ingredientesDisponiveis = response['Ingredientes'];
        console.log(this.ingredientesDisponiveis);
      }
    )
  }

  adicionarIngrediente() {
    console.log (this.ingredientes)
    var novo: ReceitaIngrediente = new ReceitaIngrediente()
    delete this.ingrediente.criador['valid']
    novo.ingrediente = this.ingrediente;
    novo.custoKg = this.custoKG;
    novo.pesoG = this.pesoG;

    if(this.ingrediente != null && !this.ingredientes.includes(novo)) {
      this.ingredientes.push(novo); 
      console.log("Adicionado: " + this.ingrediente + " à lista: " + this.ingredientes);
      this.ingrediente = null;
      this.salvar();
    } else {
      console.log("Nada selecionado")
    }
    console.log (this.ingredientes)

  }

  removerIngredientePorIndex(index : number) {
    this.ingredientes.splice(index, 1)
    this.salvar();
  }

  criarNovoIngrediente() {
    console.log("Não implementado");
  }

  salvar () {
    this.salvarIngredientes.emit(this.ingredientes);
  }

}
