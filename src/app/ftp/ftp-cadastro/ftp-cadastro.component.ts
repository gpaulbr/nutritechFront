import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FtpService } from '../ftp.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Ftp } from '../ftp';
import { Time } from '@angular/common';
import { Usuario } from '../../usuario/usuario';
import { TipoIngrediente } from '../../ingrediente/tipo-ingrediente.enum';
import { debug } from 'util';
import { GrupoService } from '../../grupo/grupo.service';
import { Grupo } from '../../grupo/grupo';
import { UsuarioService } from '../../usuario/usuario.service';
import { Ingrediente } from '../../ingrediente/ingrediente';
import { IngredienteService } from '../../ingrediente/ingrediente.service';

@Component({
  selector: 'ftp-cadastro',
  templateUrl: './ftp-cadastro.component.html',
  styleUrls: ['./ftp-cadastro.component.css']
})
export class FTPCadastroComponent implements OnInit {

  ftpForm: FormGroup
  fb: FormBuilder

  gruposDisponiveis: Grupo[];
  professoresDisponiveis: Usuario[];

  constructor(private ftpService: FtpService,
    private grupoService: GrupoService,
    private usuarioService: UsuarioService,
    private ingredienteService: IngredienteService,
    private router: Router,
    fb: FormBuilder) {
    this.fb = new FormBuilder();
    this.ftpForm = this.fb.group({
      nome: [null, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(50)])],
      status: [1, Validators.compose([Validators.required])],
      publicada: [0, Validators.compose([Validators.required])],
      passos: [null, Validators.compose([Validators.required])],
      rendimento: [null, Validators.compose([Validators.required])],
      tempo: [null, Validators.compose([Validators.required])],
      peso: [null, Validators.compose([Validators.required])],
      imagem: [""],
      tipo: [false, Validators.compose([Validators.required])],
      criadores: [null, Validators.compose([Validators.required, Validators.minLength(1)])],
      ingredientes: [null, Validators.compose([Validators.required])],
      professor: [null, Validators.compose([Validators.required, Validators.min(1)])],
      datahora: [null],
      dificuldade: [null, Validators.compose([Validators.required, Validators.min(1), Validators.max(5)])],
      grupoReceita: [null, Validators.compose([Validators.required, Validators.min(1)])]
    })
   }

  ngOnInit() {
    var usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
    if(usuarioLogado == null) {
      this.router.navigate(['./']);
    }

    this.grupoService.buscarGrupos().subscribe(
      response => {
        this.gruposDisponiveis = response['Grupos'];
        console.log(this.gruposDisponiveis);
      }
    )

    this.usuarioService.buscarProfessores().subscribe(
      response => {
        this.professoresDisponiveis = response['Usuarios'];
        console.log(this.professoresDisponiveis);
      }
    )
  }

  publicarFTP(ftp: Ftp) {
    this.ftpForm.controls.status.setValue(true);
    this.ftpForm.controls.publicada.setValue(true);
    this.ftpForm.controls.imagem.setValue("url/img.jpg");
    this.ftpForm.controls.datahora.setValue(new Date());
    
    this.debugPrint()

    this.ftpService.salvarFTP(ftp)
    .subscribe(resp => {
      alert("Ficha Técnica de Preparo cadastrada com sucesso!");
    }, erro =>{
      alert("Erro no cadastro!");
    })
  }

  alterarPassos(passos: Array<String>){
    this.ftpForm.controls.passos.setValue(passos);
    console.log(this.ftpForm.controls.passos);
  }

  alterarIntegrantes(integrantes: Array<Usuario>) {
    this.ftpForm.controls.criadores.setValue(integrantes);
    console.log(integrantes)
  }

  alterarIngredientes(ingredientes: Array<Ingrediente>) {
    this.ftpForm.controls.ingredientes.setValue(ingredientes);
    console.log(ingredientes)
  }

  alterarDificuldade(dificuldade: number){
    this.ftpForm.controls.dificuldade.setValue(dificuldade);
    console.log(this.ftpForm.controls.dificuldade);
    console.log("Dificuldade Alterada para: " + this.retornarDificuldade())
  }

  retornarDificuldade(): number{
    return this.ftpForm.controls.dificuldade.value;
  }

  alterarTipo() {
    if(this.ftpForm.controls.tipo.value) {
      this.ftpForm.controls.tipo.setValue(false);
    } else {
      this.ftpForm.controls.tipo.setValue(true);
    }
    console.log("É Privado: " + this.ftpForm.controls.tipo.value);
  }


  debugPrint() {
    console.log("####### DADOS DO FORM #######")
    console.log("Nome - " + this.ftpForm.controls.nome.value)
    console.log("Status - " + this.ftpForm.controls.status.value)
    console.log("Passos: ")
    console.log(this.ftpForm.controls.passos.value)
    console.log("Rendimento - " + this.ftpForm.controls.rendimento.value)
    console.log("Tempo - " + this.ftpForm.controls.tempo.value)
    console.log("Peso - " + this.ftpForm.controls.peso.value)
    console.log("Imagem - " + this.ftpForm.controls.imagem.value)
    console.log("Privado (tipo) - " + this.ftpForm.controls.tipo.value)
    console.log("Criadores :")
    console.log(this.ftpForm.controls.criadores.value)
    console.log("Ingredientes :")
    console.log(this.ftpForm.controls.ingredientes.value)
    console.log("Professor - " + this.ftpForm.controls.professor.value)
    console.log("Data - " + this.ftpForm.controls.datahora.value)
    console.log("Dificuldade - " + this.ftpForm.controls.dificuldade.value)
    console.log("Grupo Receita - " + this.ftpForm.controls.grupoReceita.value)
    console.log("#############################")
  }
}
