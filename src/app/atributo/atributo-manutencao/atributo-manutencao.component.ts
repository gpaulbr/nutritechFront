import { Component, OnInit } from '@angular/core';
import { AtributoService } from '../atributo.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-atributo-manutencao',
  templateUrl: './atributo-manutencao.component.html',
  styleUrls: ['./atributo-manutencao.component.css']
})
export class AtributoManutencaoComponent implements OnInit {

  atributoForm: FormGroup;

  obrigatorio = [{
    valor: true,
    texto: "Sim",
    selecionado: true
  },
  {
    valor: false,
    texto: "Não",
    selecionado: false
  }];

  constructor(
    private atributoService: AtributoService,
    fb: FormBuilder) { 
      this.atributoForm = fb.group({
        nome: [null, Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(50)])],
        ordem: [null, Validators.compose([Validators.required, Validators.maxLength(50)])],
        multiplicador: [null, Validators.compose([Validators.required])],
        unidade: [null, Validators.compose([Validators.required, Validators.maxLength(20)])],
        obrigatorio: [true, Validators.compose([Validators.required])],
      })
    }

  ngOnInit() {
  }

  definirObrigatorio(valor: number){
    this.atributoForm.controls.obrigatorio.setValue(valor);
  }

  cadastrar(){
    this.atributoService.salvarAtributo(this.atributoForm.value).subscribe(
      response => {
        console.log(response);
        alert("Atributo cadastrado com sucesso");
      },
      error => {
        console.log(error);
        alert("Erro no cadastro");
      });
  }

}
