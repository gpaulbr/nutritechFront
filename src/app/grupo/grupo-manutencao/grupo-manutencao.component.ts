import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { GrupoReceita } from '../../ingrediente/grupo-receita';
import { GrupoService } from '../grupo.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-grupo-manutencao',
  templateUrl: './grupo-manutencao.component.html',
  styleUrls: ['./grupo-manutencao.component.css']
})
export class GrupoManutencaoComponent implements OnInit {

  grupoForm: FormGroup;
  fb: FormBuilder;

  constructor(private grupoService: GrupoService,
    private router: Router,
    fb: FormBuilder) {
    this.fb = new FormBuilder();
    this.grupoForm = this.fb.group({
      nome: [null, Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(50)])],
      custo: [null, Validators.compose([Validators.required, Validators.min(0), Validators.max(32768)])]      
    })
   }

  ngOnInit() {
    var usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
    if(usuarioLogado == null) {  
      this.router.navigate(['./']);
    }
  }

  cadastrar () {
    this.grupoService.salvarGrupo(this.grupoForm.value).subscribe(
      response => {
        alert("Grupo cadastrado com sucesso");
      },
      error => {
        alert("Erro no cadastro");
      });
  }
}
