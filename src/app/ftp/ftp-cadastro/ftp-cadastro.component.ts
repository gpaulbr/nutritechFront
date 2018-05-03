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
      passos: [null, Validators.compose([Validators.required])],
      rendimento: [null, Validators.compose([Validators.required])],
      tempo: [null, Validators.compose([Validators.required])],
      peso: [null, Validators.compose([Validators.required])],
      imagem: [null],
      tipo: [false, Validators.compose([Validators.required])],
      criadores: [null, Validators.compose([Validators.required, Validators.minLength(1)])],
      ingredientes: [null, Validators.compose([Validators.required])],
      professor: [null, Validators.compose([Validators.required, Validators.min(1)])],
      data: [null, Validators.compose([Validators.required])],
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

  cadastrar(ftp: Ftp) {
    ftp.status = true;
    ftp.imagem = "url/img.jpg"
    ftp.datahora = new Date()
    // ftp.horario.hours = ftp.data.getHours();
    // ftp.horario.minutes = ftp.data.getMinutes();

    this.ftpService.getDateTimeNow().subscribe(
      response => {
        ftp.datahora = response['Receitas'];
        console.log("Data e Hora do Cadastro: " + ftp.datahora);
      }
    )

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
    this.ftpForm.controls.criadores.setValue(ingredientes);
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

}
