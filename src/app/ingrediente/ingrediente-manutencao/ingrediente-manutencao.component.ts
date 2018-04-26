import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { IngredienteService } from '../ingrediente.service';

@Component({
  selector: 'app-ingrediente-manutencao',
  templateUrl: './ingrediente-manutencao.component.html',
  styleUrls: ['./ingrediente-manutencao.component.css']
})
export class IngredienteManutencaoComponent implements OnInit {

  ingredienteForm: FormGroup;
  ingredienteService: IngredienteService;

  tiposIngredientes = [{
    valor: 1,
    texto: "Comum",
    selecionado: true
  },
  {
    valor: 0,
    texto: "Privado",
    selecionado: false
  }];

  constructor(
    fb: FormBuilder) { 
      this.ingredienteForm = fb.group({
        nome: [null, Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(50)])],
        origem: [null, Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(50)])],
        tipoIngrediente: [1, Validators.compose([Validators.required])],
      })
    }


  ngOnInit() {
    this.ingredienteService.buscarIngredientes();
  }

  cadastrarIngrediente(){
    this.ingredienteService.cadastrarIngrediente(this.ingredienteForm.value);
  }

  definirTipoIngrediente(valor: number){
    this.ingredienteForm.controls.tipoIngrediente.setValue(valor);
  }

  
  
}
