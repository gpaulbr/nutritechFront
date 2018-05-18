import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FtpService } from '../ftp.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Ftp } from '../ftp';
import { Usuario } from '../../usuario/usuario';
import { GrupoService } from '../../grupo/grupo.service';
import { Grupo } from '../../grupo/grupo';
import { UsuarioService } from '../../usuario/usuario.service';
import { IngredienteService } from '../../ingrediente/ingrediente.service';
import { FtpTipo } from '../ftp-tipo.enum';
import { ReceitaIngrediente } from '../ftp-receita-ingrediente';
import {ToastrService} from "ngx-toastr";
import {GrupoReceita} from '../../ingrediente/grupo-receita';

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
    private toastr: ToastrService,
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
      tipo: [FtpTipo.PUBLICO, Validators.compose([Validators.required])],
      criadores: [null, Validators.compose([Validators.required, Validators.minLength(1)])],
      receitaIngrediente: [null, Validators.compose([Validators.required, Validators.min(1)])],
      professor: [null, Validators.compose([Validators.required, Validators.min(1)])],
      datahora: [null],
      dificuldade: [null, Validators.compose([Validators.required, Validators.min(1), Validators.max(5)])],
      grupoReceita: [null, Validators.compose([Validators.required])]
    });
   }

  ngOnInit() {
    var usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
    if(usuarioLogado == null) {
      this.router.navigate(['./']);
      return;
    }
  }

  alterarPassos(passos: Array<String>){
    this.ftpForm.controls.passos.setValue(passos);
  }

  alterarIntegrantes(criadores: Array<Usuario>) {
    this.ftpForm.controls.criadores.setValue(criadores);
    console.log(criadores);
  }

  alterarGrupoReceita(grupoReceita: GrupoReceita) {
    this.ftpForm.controls.grupoReceita.setValue(grupoReceita);
    console.log(grupoReceita);
  }

  alterarProfessor(professor: Usuario) {
    this.ftpForm.controls.professor.setValue(professor);
    console.log(professor);
  }

  alterarIngredientes(receitaIngredientes: Array<ReceitaIngrediente>) {
    this.ftpForm.controls.receitaIngrediente.setValue(receitaIngredientes);
    console.log(receitaIngredientes);
  }

  alterarDificuldade(dificuldade: number){
    this.ftpForm.controls.dificuldade.setValue(dificuldade);
    console.log(dificuldade);
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
        this.toastr.success('Ficha Técnica de Preparo cadastrada com sucesso!');
      }, error =>{
        this.toastr.error(error.error);
      })
  }
}
