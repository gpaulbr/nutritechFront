import { Component, OnInit, NgModule } from '@angular/core';
import { Usuario } from '../usuario';
import { TipoUsuario } from '../tipo-usuario.enum';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { RadioButton, RadioButtonElemento } from '../../shared/entities/radio-button';
import { UsuarioService } from '../usuario.service';
import { Http, Response } from '@angular/http';
import { Router } from '@angular/router';
import { UsuarioLogadoDto } from '../usuario-logado-dto';



@Component({
  selector: 'app-usuario-manutencao',
  templateUrl: './usuario-manutencao.component.html',
  styleUrls: ['./usuario-manutencao.component.css']
})
export class UsuarioManutencaoComponent implements OnInit {

  usuario: Usuario = new Usuario();
  usuarioLogado: UsuarioLogadoDto;
  senhaConfirmacao: string = '';
  usuarioForm: FormGroup;
  mensagemErroSenha = "As senhas digitadas estão diferentes";
  senhaValida = true;
  public mascaraCPF = [/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/];

  tiposUsuarios = [{
    valor: 1,
    texto: "Usuário",
    selecionado: true
  },
  {
    valor: 2,
    texto: "Professor",
    selecionado: false
  }];
  tiposStatus = [{
    valor: true,
    texto: "Ativo",
    selecionado: true
  },
  {
    valor: false,
    texto: "Inativo",
    selecionado: false
  }];

  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
    fb: FormBuilder) { 
      this.usuarioForm = fb.group({
        nome: [null, Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(50)])],
        email: [null, Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(50)])],
        matricula: [null, Validators.compose([Validators.required])],
        senha: [null, Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(30)])],
        cpf: [null, Validators.compose([Validators.required, Validators.minLength(14), Validators.maxLength(14)])],
        tipo: [1, Validators.required],
        status: [true, Validators.required]
      })
    }

  ngOnInit() {
    console.log(JSON.parse(localStorage.getItem('usuarioLogado')));
    this.usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
    console.log(this.usuarioLogado)
  }

  cadastrarUsuario(){
    this.usuarioService.salvarUsuario(this.usuarioForm.value).subscribe(
      response => {
        console.log(response)
        alert("Usuario cadastrado com sucesso");
      },
      error => {
        console.log(error)
        alert("Erro no cadastro");
      });
  }

  definirTipoUsuario(valor: number){
    console.log(this.usuarioForm);
    this.usuarioForm.controls.tipo.setValue(valor);
  }

  definirTipoStatus(valor: boolean){
    this.usuarioForm.controls.status.setValue(valor);
  }

  verificarSeUsuarioEhAdmin() {
    if(this.usuarioLogado) {
      return this.usuarioLogado.tipo == 'ADMIN';
    }
    return false;
  }

  validarSenha()
  { 
    this.senhaValida = this.usuarioForm.controls['senha'].value == this.senhaConfirmacao;
  }

}
