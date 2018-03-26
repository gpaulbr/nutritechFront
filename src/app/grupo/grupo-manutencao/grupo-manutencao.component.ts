import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms/src/model';
import { Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-grupo-manutencao',
  templateUrl: './grupo-manutencao.component.html',
  styleUrls: ['./grupo-manutencao.component.css']
})
export class GrupoManutencaoComponent implements OnInit {

  grupoForm: FormGroup;

  constructor(fb: FormBuilder) {
    this.grupoForm = fb.group({
      nome: [null, Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(50)])],
      valor: [null, Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(50)])]      
    })
   }

  ngOnInit() {
  }

}
