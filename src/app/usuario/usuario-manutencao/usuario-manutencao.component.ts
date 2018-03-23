import { Component, OnInit, NgModule } from '@angular/core';
import { Usuario } from '../usuario';
import { TipoUsuario } from '../tipo-usuario.enum';
import { FormsModule } from '@angular/forms';
import { RadioButton, RadioButtonElemento } from '../../shared/entities/radio-button';
import { UsuarioService } from '../usuario.service';
import { Http, Response } from '@angular/http';
import { HttpClient } from '@angular/common/http';


@NgModule({
  imports: [
    FormsModule,
  ]
})

@Component({
  selector: 'app-usuario-manutencao',
  templateUrl: './usuario-manutencao.component.html',
  providers: [UsuarioService],
  styleUrls: ['./usuario-manutencao.component.css']
})
export class UsuarioManutencaoComponent implements OnInit {

  usuario: Usuario = new Usuario();
  senhaConfirmacao: string = '';

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

  constructor(private usuarioService: UsuarioService) { }
  
  ngOnInit() {
    console.log(this.usuarioService.buscarUsuarios())
  }

  mostrarDados(){
    console.log(this.usuario);
    console.log(this.usuarioService.salvarUsuario(this.usuario));
  }

  definirTipoUsuario(valor: number){
    this.usuario.tipoUsuario = valor;
  }

  definirTipoStatus(valor: boolean){
    this.usuario.ativo = valor;
  }


  
}
