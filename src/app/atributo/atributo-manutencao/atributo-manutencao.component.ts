import { Component, OnInit } from '@angular/core';
import { AtributoService } from '../atributo.service';
import { Usuario } from '../../usuario/usuario';
import { TipoUsuario } from '../../usuario/tipo-usuario.enum';
import { LoginService } from '../../login/login.service';
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
  usuarioLogado: Usuario;
  admin: Boolean = false;

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
        multiplicador: [null, Validators.compose([Validators.required,Validators.min(1)])],
        unidade: [null, Validators.compose([Validators.required, Validators.maxLength(20)])],
        obrigatorio: [true, Validators.compose([Validators.required])],
      })
    }


    limpar(){
      this.atributoForm;    
      this.atributoForm.controls.nome.setValue('')
      this.atributoForm.controls.nome.markAsPristine();

      this.atributoForm.controls.ordem.setValue('')
      this.atributoForm.controls.ordem.markAsPristine();

      this.atributoForm.controls.multiplicador.setValue('')
      this.atributoForm.controls.multiplicador.markAsPristine();

      this.atributoForm.controls.unidade.setValue('')
      this.atributoForm.controls.unidade.markAsPristine();

      this.atributoForm.controls.obrigatorio.setValue(true)   
      
    }   

  ngOnInit() {
    var usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
    if(usuarioLogado == null) {  
      this.router.navigate(['./']);
    } else {
      if(usuarioLogado.tipo === TipoUsuario.ADMIN){ 
        this.admin = true;
      } else{
        this.router.navigate(['./']); 
        this.toastr.warning("Você não tem permissão!") /* após o ajuste do header verificar essa ação */
      }    
    }
  }

  definirObrigatorio(valor: number){
    this.atributoForm.controls.obrigatorio.setValue(valor);
  }

  cadastrar(){
    this.atributoService.salvarAtributo(this.atributoForm.value).subscribe(
      response => {
        this.toastr.success('Atributo cadastrado com sucesso');
        this.limpar();
      },
      error => {
        this.toastr.error(error.error.message);
      });
  }

}
