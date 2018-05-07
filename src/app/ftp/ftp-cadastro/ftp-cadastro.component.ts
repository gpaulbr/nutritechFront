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
import { FtpTipo } from '../ftp-tipo.enum';
import { ReceitaIngrediente } from '../ftp-receita-ingrediente';

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
      id: [null],
      nome: [null, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(50)])],
      status: [1, Validators.compose([Validators.required])],
      publicada: [0, Validators.compose([Validators.required])],
      passos: [null, Validators.compose([Validators.required])],
      rendimento: [null, Validators.compose([Validators.required])],
      tempo: [null, Validators.compose([Validators.required])],
      peso: [null, Validators.compose([Validators.required])],
      imagem: [""],
      tipo: [1, Validators.compose([Validators.required])],
      criadores: [null, Validators.compose([Validators.required, Validators.minLength(1)])],
      //ingredientes: [null, Validators.compose([Validators.required])],
      receitaIngrediente: [null, Validators.compose([Validators.required, Validators.min(1)])],
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
        this.gruposDisponiveis.forEach(item => {
          delete item['active']
        });
        console.log(this.gruposDisponiveis);
      }
    )

    this.usuarioService.buscarProfessores().subscribe(
      response => {
        this.professoresDisponiveis = response['Usuarios'];
        this.professoresDisponiveis.forEach(item => {
          delete item.senha;
          delete item['valid'];
        });
        console.log(this.professoresDisponiveis);
      });
  }

  alterarPassos(passos: Array<String>){
    this.ftpForm.controls.passos.setValue(passos);
    console.log(this.ftpForm.controls.passos);
  }

  alterarIntegrantes(integrantes: Array<Usuario>) {
    this.ftpForm.controls.criadores.setValue(integrantes);
    console.log(integrantes)
  }

  alterarIngredientes(ingredientes: Array<ReceitaIngrediente>) {
    this.ftpForm.controls.receitaIngrediente.setValue(ingredientes);
    console.log(ingredientes)
  }

  alterarDificuldade(dificuldade: number){
    this.ftpForm.controls.dificuldade.setValue(dificuldade);
    console.log(this.ftpForm.controls.dificuldade);
    console.log('Dificuldade Alterada para: ' + this.retornarDificuldade())
  }

  retornarDificuldade(): number{
    return this.ftpForm.controls.dificuldade.value;
  }

  alterarTipo() {
    if(this.ftpForm.controls.tipo.value == FtpTipo.PRIVADO) {
      this.ftpForm.controls.tipo.setValue(FtpTipo.PUBLICO);
    } else {
      this.ftpForm.controls.tipo.setValue(FtpTipo.PRIVADO);
    }
    console.log('Tipo')
    console.log('É Privado: ' + this.ftpForm.controls.tipo.value);
  }

  cadastrar(ftp: Ftp, publicada: Boolean) {
    delete this.ftpForm.controls['id'];
    this.ftpForm.controls.publicada.setValue(publicada); // status de publicada no banco
    this.ftpForm.controls.imagem.setValue('none yet');
    this.ftpForm.controls.datahora.setValue(new Date());

    this.ftpService.salvarFTP(ftp)
      .subscribe(resp => {
        alert('Ficha Técnica de Preparo cadastrada com sucesso!');
      }, erro =>{
        alert('Erro no cadastro!');
      })
  }
}
