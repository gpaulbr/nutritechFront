import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { Ingrediente } from '../../ingrediente/ingrediente';
import { IngredienteService } from '../../ingrediente/ingrediente.service';

@Component({
  selector: 'app-ftp-selecao-ingredientes',
  templateUrl: './ftp-selecao-ingredientes.component.html',
  styleUrls: ['./ftp-selecao-ingredientes.component.css']
})
export class FtpSelecaoIngredientesComponent implements OnInit {

  ingrediente: Ingrediente = null;
  ingredientes = new Array<Ingrediente>();

  ingredientesDisponiveis: Ingrediente[];

  constructor(private ingredienteService: IngredienteService) { }

  @Output()
  salvarIngredientes = new EventEmitter<Array<Ingrediente>>();
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
    if(this.ingrediente != null && !this.ingredientes.includes(this.ingrediente)) {
      this.ingredientes.push(this.ingrediente); 
      console.log("Adicionado: " + this.ingrediente + " à lista: " + this.ingredientes);
      this.ingrediente = null;
      this.salvar();
    } else {
      console.log("Nada selecionado")
    }
  }

  removerIngredientePorIndex(index : number) {
    this.ingredientes.splice(index, 1)
    this.salvar();
  }

  removerIngredientePorIngrediente(user : Ingrediente) {
    var index = this.ingredientes.indexOf(user)
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
