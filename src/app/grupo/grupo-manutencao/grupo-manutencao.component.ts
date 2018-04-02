import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { GrupoReceita } from '../../ingrediente/grupo-receita';

@Component({
  selector: 'app-grupo-manutencao',
  templateUrl: './grupo-manutencao.component.html',
  styleUrls: ['./grupo-manutencao.component.css']
})
export class GrupoManutencaoComponent implements OnInit {

  grupoForm: FormGroup;
  fb: FormBuilder

  constructor() {
    this.fb = new FormBuilder();
    this.grupoForm = this.fb.group({
      nome: [null, Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(50)])],
      valor: [null, Validators.compose([Validators.required, Validators.min(0), Validators.max(32768)])]      
    })
   }

  ngOnInit() {
  }

  cadastrar () {
    console.log("[To do] Novo Grupo: " + this.grupoForm.get('nome').value + " (" + this.grupoForm.get('valor').value + "g)");
  }
}
