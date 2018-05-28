import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { FtpService } from '../ftp.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Ftp } from '../ftp';
import { Usuario } from '../../usuario/usuario';
import { GrupoService } from '../../grupo/grupo.service';
import { UsuarioService } from '../../usuario/usuario.service';
import { IngredienteService } from '../../ingrediente/ingrediente.service';
import { FtpTipo } from '../ftp-tipo.enum';
import { ReceitaIngrediente } from '../ftp-receita-ingrediente';
import {ToastrService} from 'ngx-toastr';
import {GrupoReceita} from '../../ingrediente/grupo-receita';
import { Imagem } from '../imagem';
import {FtpIntegrantesComponent} from '../ftp-integrantes/ftp-integrantes.component';
import {FtpModoPreparoComponent} from '../ftp-modo-preparo/ftp-modo-preparo.component';
import {FtpSelecaoIngredientesComponent} from '../ftp-selecao-ingredientes/ftp-selecao-ingredientes.component';
import {FtpImageFileUploadComponent} from '../ftp-image-file-upload/ftp-image-file-upload.component';
import {FtpSelecaoGruporeceitaComponent} from '../ftp-selecao-gruporeceita/ftp-selecao-gruporeceita.component';
import {FtpSelecaoProfessorComponent} from '../ftp-selecao-professor/ftp-selecao-professor.component';
import {FtpDificuldadeComponent} from '../ftp-dificuldade/ftp-dificuldade.component';
import {TipoUsuario} from '../../usuario/tipo-usuario.enum';


@Component({
  selector: 'ftp-cadastro',
  templateUrl: './ftp-cadastro.component.html',
  styleUrls: ['./ftp-cadastro.component.css']
})
export class FTPCadastroComponent implements OnInit {

  ftpForm: FormGroup;
  fb: FormBuilder;
  custoTotal: String = '0.00';

  usuarioLogado: Usuario;

  // Components
  @ViewChild(FtpModoPreparoComponent) preparoComponent;
  @ViewChild(FtpIntegrantesComponent) integrantesComponent;
  @ViewChild(FtpSelecaoIngredientesComponent) ingredientesComponent;
  @ViewChild(FtpImageFileUploadComponent) imageComponent;
  @ViewChild(FtpSelecaoGruporeceitaComponent) gruporeceitaComponent;
  @ViewChild(FtpSelecaoProfessorComponent) professorComponent;
  @ViewChild(FtpDificuldadeComponent) dificuldadeComponent;

  constructor(private ftpService: FtpService,
    private grupoService: GrupoService,
    private usuarioService: UsuarioService,
    private ingredienteService: IngredienteService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
    fb: FormBuilder) {
    this.fb = new FormBuilder();
    this.ftpForm = this.fb.group({
      id: [null],
      nome: [null, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(50)])],
      status: [1, Validators.compose([Validators.required])],
      publicada: [false],
      passos: [null, Validators.compose([Validators.required])],
      rendimento: [null, Validators.compose([Validators.required])],
      tempo: [null, Validators.compose([Validators.required])],
      peso: [null, Validators.compose([Validators.required])],
      imagem: [null, Validators.compose([Validators.required])],
      tipo: [FtpTipo.PUBLICO, Validators.compose([Validators.required])],
      criadores: [null, Validators.compose([Validators.required, Validators.minLength(1)])],
      receitaIngrediente: [null, Validators.compose([Validators.required, Validators.min(1)])],
      professor: [null, Validators.compose([Validators.required, Validators.min(1)])],
      datahora: [null],
      dificuldade: [null, Validators.compose([Validators.required, Validators.min(1), Validators.max(5)])],
      grupoReceita: [null, Validators.compose([Validators.required])],
      nota: [null, Validators.compose([Validators.min(0), Validators.max(10)])]
    });

    let receita;
    this.route.params.subscribe(params => receita = params);

    if (receita.id !== undefined) {
      this.ftpService.obterFTP(receita.id)
        .subscribe(res => {
          this.ftpForm.controls['id'].setValue(receita.id);
          this.ftpForm.controls['nome'].setValue(res.nome);
          this.ftpForm.controls['status'].setValue(res.status);
          this.ftpForm.controls['publicada'].setValue(res.publicada);

          this.ftpForm.controls['passos'].setValue(res.passos); // ok
          this.preparoComponent.passos = res.passos;

          this.ftpForm.controls['rendimento'].setValue(res.rendimento);
          this.ftpForm.controls['tempo'].setValue(res.tempo);
          this.ftpForm.controls['peso'].setValue(res.peso);

          this.ftpForm.controls['imagem'].setValue(res.imagem); // ok
          this.imageComponent.imgFromBase64(res.imagem.ext, res.imagem.base64);

          this.ftpForm.controls['tipo'].setValue(res.tipo);

          this.ftpForm.controls['criadores'].setValue(res.criadores); // ok
          this.integrantesComponent.integrantes = res.criadores;

          this.ftpForm.controls['receitaIngrediente'].setValue(res.receitaIngrediente); //
          res.receitaIngrediente.forEach(ri => {
            this.ingredientesComponent.ingrediente = ri.ingrediente;
            this.ingredientesComponent.custoKg = ri.custoKg;
            this.ingredientesComponent.pesoG = ri.pesoG;
            this.ingredientesComponent.adicionarIngrediente();
          });

          this.ftpForm.controls['grupoReceita'].setValue(res.grupoReceita); //
          (document.getElementById('seletorGrupoReceita') as HTMLSelectElement).options[0].innerHTML = res.grupoReceita.nome ;

          this.ftpForm.controls['professor'].setValue(res.professor); //
          (document.getElementById('seletorProf') as HTMLSelectElement).options[0].innerHTML = res.professor.nome;

          this.ftpForm.controls['datahora'].setValue(res.datahora);

          this.ftpForm.controls['dificuldade'].setValue(res.dificuldade); // ok
          this.dificuldadeComponent.alterarDificuldade(res.dificuldade);

         

          this.ftpForm.controls['nota'].setValue(res.nota);
        });
    }
  }

  ngOnInit() {
    this.usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
    if (this.usuarioLogado == null) {
      this.router.navigate(['./']);
      return;
    }
  }

  /*
   * Manipulação dos Dados do Formulário
   */

  alterarPassos(passos: Array<String>){
    this.ftpForm.controls.passos.setValue(passos);
  }

  alterarIntegrantes(criadores: Array<Usuario>) {
    this.ftpForm.controls.criadores.setValue(criadores);
  }

  alterarGrupoReceita(grupoReceita: GrupoReceita) {
    this.ftpForm.controls.grupoReceita.setValue(grupoReceita);
  }

  alterarProfessor(professor: Usuario) {
    this.ftpForm.controls.professor.setValue(professor);
  }

  alterarIngredientes(receitaIngredientes: Array<ReceitaIngrediente>) {
    this.ftpForm.controls.receitaIngrediente.setValue(receitaIngredientes);
  }

  alterarImagem(imagem: Imagem) {
    this.ftpForm.controls.imagem.setValue(imagem);
  }

  alterarDificuldade(dificuldade: number){
    this.ftpForm.controls.dificuldade.setValue(dificuldade);
  }

  alterarCustoTotal(custoTotal: String) {
    this.custoTotal = custoTotal;
  }

  alterarPesoTotal(pesoTotal: Number) {
    this.ftpForm.controls.peso.setValue(pesoTotal);
  }

  retornarDificuldade(): number{
    return this.ftpForm.controls.dificuldade.value;
  }

  alterarTipo() {
    if (this.ftpForm.controls.tipo.value == FtpTipo.PRIVADO) {
      this.ftpForm.controls.tipo.setValue(FtpTipo.PUBLICO);
    } else {
      this.ftpForm.controls.tipo.setValue(FtpTipo.PRIVADO);
    }
  }

  /*
   * Verificações
   */

  UsuarioEhAdmin(): Boolean {
    if (this.usuarioLogado) {
      return this.usuarioLogado.tipo == TipoUsuario.ADMIN;
    }
    return false;
  }

  UsuarioEhProfessor(): Boolean {
    if (this.usuarioLogado) {
      return this.usuarioLogado.tipo == TipoUsuario.PROFESSOR;
    }
    return false;
  }

  UsuarioEhProfessorDisciplina(): Boolean {
    if (this.usuarioLogado) {
      return this.usuarioLogado.id == this.ftpForm.value.professor.id;
    }
    return false;
  }

  podeLimpar(): Boolean {
    if (this.podeSalvar() || this.ftpForm.value.id == null) {
      return true;
    } else {
      return false;
    }
  }

  podeSalvar(): Boolean {
    if (!this.receitaEstaPublicada()) {
      return true;
    } else {
      return false;
    }
  }

  campoPodeSerAlterado(): Boolean {
    if(this.receitaEstaPublicada()) {
      return false;
    }
    return true; // é mais complicado que isso, mas temporariamente fica assim
  }

  podeAlterarNota(): Boolean {
    return (this.UsuarioEhAdmin() || this.UsuarioEhProfessorDisciplina()); // é mais complicado que isso, mas temporariamente fica assim
  }

  receitaEstaPublicada(): Boolean {
    return (this.ftpForm.value.publicada == true)
  }

  /*
   * Controle de Estado dos Campos do Formulário
   */

  dirtyAll() { // não encontrei forma de iterar sobre controls.
    this.ftpForm.controls['id'].markAsDirty();
    this.ftpForm.controls['nome'].markAsDirty();
    this.ftpForm.controls['status'].markAsDirty();
    this.ftpForm.controls['publicada'].markAsDirty();
    this.ftpForm.controls['passos'].markAsDirty();
    this.ftpForm.controls['rendimento'].markAsDirty();
    this.ftpForm.controls['tempo'].markAsDirty();
    this.ftpForm.controls['peso'].markAsDirty();
    this.ftpForm.controls['imagem'].markAsDirty();
    this.ftpForm.controls['tipo'].markAsDirty();
    this.ftpForm.controls['criadores'].markAsDirty();
    this.ftpForm.controls['receitaIngrediente'].markAsDirty();
    this.ftpForm.controls['professor'].markAsDirty();
    this.ftpForm.controls['datahora'].markAsDirty();
    this.ftpForm.controls['dificuldade'].markAsDirty();
    this.ftpForm.controls['grupoReceita'].markAsDirty();
  }

  pristineAll() {
    this.ftpForm.controls['id'].markAsPristine();
    this.ftpForm.controls['nome'].markAsPristine();
    this.ftpForm.controls['status'].markAsPristine();
    this.ftpForm.controls['publicada'].markAsPristine();
    this.ftpForm.controls['passos'].markAsPristine();
    this.ftpForm.controls['rendimento'].markAsPristine();
    this.ftpForm.controls['tempo'].markAsPristine();
    this.ftpForm.controls['peso'].markAsPristine();
    this.ftpForm.controls['imagem'].markAsPristine();
    this.ftpForm.controls['tipo'].markAsPristine();
    this.ftpForm.controls['criadores'].markAsPristine();
    this.ftpForm.controls['receitaIngrediente'].markAsPristine();
    this.ftpForm.controls['professor'].markAsPristine();
    this.ftpForm.controls['datahora'].markAsPristine();
    this.ftpForm.controls['dificuldade'].markAsPristine();
    this.ftpForm.controls['grupoReceita'].markAsPristine();
  }

  limparDadosInvalidos(ftp: Ftp) {
    ftp.criadores.forEach(c => {
      delete c['valid'];
      delete c.senha;
      console.log(c);
    });
    delete ftp.professor['valid'];
    delete ftp.professor.senha;
    console.log(ftp.professor)

    ftp.receitaIngrediente.forEach(ri => {
      delete ri.ingrediente.criador['valid'];
    });
    delete ftp.grupoReceita['active'];
  }

  /*
   * Funções dos Botões do Formulário
   */

  limpar() {
    this.ftpForm.reset();
    this.ftpForm.controls['id'].setValue(null);
    this.ftpForm.controls['status'].setValue(1);
    this.ftpForm.controls['publicada'].setValue(false);
    this.ftpForm.controls['tipo'].setValue(FtpTipo.PUBLICO);
    this.gruporeceitaComponent.grupoReceita = null;
    this.professorComponent.professor = null;
    this.ingredientesComponent.receitaIngredientes = new Array<ReceitaIngrediente>();
    this.integrantesComponent.integrantes = new Array<Usuario>();
    this.preparoComponent.passos = new Array<String>();
    this.pristineAll();
  }


  cadastrar(ftp: Ftp, publicada: Boolean) {
    this.limparDadosInvalidos(ftp);
    ftp.publicada = publicada // status de publicada no banco
    ftp.datahora = new Date();
    this.dirtyAll();

    if (ftp.id != null) {
      this.ftpService.atualizarFTP(ftp).subscribe( resp => {
        this.toastr.success('Ficha Técnica de Preparo atualizada com sucesso!');
        this.router.navigate(['./ftp-listagem']);
      }, error => {
        this.toastr.error(error.error);
      });
    } else {
      this.ftpService.salvarFTP(ftp)
        .subscribe(resp => {
          this.toastr.success('Ficha Técnica de Preparo cadastrada com sucesso!');
          this.router.navigate(['./ftp-listagem']);
        }, error => {
          this.toastr.error(error.error);
        });
    }
  }
}
