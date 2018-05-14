import { Component, OnInit } from '@angular/core';
import { AtributoService } from '../atributo.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

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
    private router: Router,
    private toastr: ToastrService,
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
    var usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
    if(usuarioLogado == null) {  
      this.router.navigate(['./']);
    }
  }

  definirObrigatorio(valor: number){
    this.atributoForm.controls.obrigatorio.setValue(valor);
  }

  cadastrar(){
    this.atributoService.salvarAtributo(this.atributoForm.value).subscribe(
      response => {
        this.toastr.success('Atributo cadastrado com sucesso');
      },
      error => {
        this.toastr.error('Erro no cadastro');
      });
  }

}
