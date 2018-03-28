import { Component, OnInit, NgModule } from '@angular/core';
import { Usuario } from '../usuario';
import { TipoUsuario } from '../tipo-usuario.enum';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { RadioButton, RadioButtonElemento } from '../../shared/entities/radio-button';
import { UsuarioService } from '../usuario.service';
import { Http, Response } from '@angular/http';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-usuario-manutencao',
  templateUrl: './usuario-manutencao.component.html',
  providers: [UsuarioService],
  styleUrls: ['./usuario-manutencao.component.css']
})
export class UsuarioManutencaoComponent implements OnInit {

  usuario: Usuario = new Usuario();
  senhaConfirmacao: string = '';
  usuarioForm: FormGroup;
  mensagemErroSenha = "As senhas digitadas estão diferentes";
  senhaValida = true;
  public mascaraCPF = [/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/];

  tiposUsuarios = [{
    valor: 1,
    texto: "Usuario",
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
    fb: FormBuilder) { 
      this.usuarioForm = fb.group({
        nome: [null, Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(50)])],
        email: [null, Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(50)])],
        matricula: [null, Validators.compose([Validators.required])],
        senha: [null, Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(30)])],
        cpf: [null, Validators.compose([Validators.required, Validators.minLength(14), Validators.maxLength(14)])],
        tipoUsuario: [1, Validators.required],
        ativo: [true, Validators.required]
      })
    }

  ngOnInit() {
    this.usuarioService.buscarUsuarios();
  }

  cadastrarUsuario(){
    this.usuarioService.salvarUsuario(this.usuarioForm.value);
  }

  definirTipoUsuario(valor: number){
    console.log(this.usuarioForm);
    this.usuarioForm.controls.tipoUsuario.setValue(valor);
  }

  definirTipoStatus(valor: boolean){
    this.usuarioForm.controls.ativo.setValue(valor);
  }

  validarSenha()
  { 
    this.senhaValida = this.usuarioForm.controls['senha'].value == this.senhaConfirmacao;
  }

}