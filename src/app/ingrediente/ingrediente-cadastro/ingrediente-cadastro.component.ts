import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Ingrediente } from '../ingrediente';
import { TipoIngrediente } from '../tipo-ingrediente.enum';
import { AtributoService } from '../../atributo/atributo.service';
import { Atributo } from '../../atributo/atributo';

@Component({
  selector: 'app-ingrediente-cadastro',
  templateUrl: './ingrediente-cadastro.component.html',
  styleUrls: ['./ingrediente-cadastro.component.css']
})
export class IngredienteCadastroComponent implements OnInit {

  ingredienteForm: FormGroup;
  atributos: Atributo[];

  tiposIngredientes = [{
    valor: TipoIngrediente.Privado,
    texto: "Privado",
    selecionado: true
  },
  {
    valor: TipoIngrediente.Comum,
    texto: "Comum",
    selecionado: false
  }];

  constructor(fb: FormBuilder, private atributosService: AtributoService) {

    this.ingredienteForm = fb.group({
      nome: fb.control('', [Validators.required, Validators.minLength(3)]),
      origem: fb.control('', [Validators.required, Validators.minLength(3)]),
      tipo: [TipoIngrediente[TipoIngrediente.Privado], Validators.required],
    });
  }

  ngOnInit() {
    this.atributosService.buscarAtributos()
      .subscribe(a => this.atributos = a['Atributos']);    
  }

  definirTipoIngrediente(valor: TipoIngrediente){
    let tipoIng = valor === TipoIngrediente.Privado ? 
      TipoIngrediente[TipoIngrediente.Privado] : TipoIngrediente[TipoIngrediente.Comum];
    this.ingredienteForm.controls.tipo.setValue(tipoIng);
    console.log(this.atributos);
  }

  cadastrarIngrediente(ingrediente: Ingrediente) {
    console.log(ingrediente);
  }

}
