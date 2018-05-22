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
      publicada: [0, Validators.compose([Validators.required])],
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
          })

          this.ftpForm.controls['professor'].setValue(res.professor); //
          this.professorComponent.loadUsuarioWithIdOnInit = res.professor.id;

          this.ftpForm.controls['datahora'].setValue(res.datahora);

          this.ftpForm.controls['dificuldade'].setValue(res.dificuldade); // ok
          this.dificuldadeComponent.alterarDificuldade(res.dificuldade);

          this.ftpForm.controls['grupoReceita'].setValue(res.grupoReceita); //
          this.gruporeceitaComponent.grupoReceita = res.grupoReceita;
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

  alterarImagem(imagem: Imagem) {
    this.ftpForm.controls.imagem.setValue(imagem);
    console.log(imagem);
  }

  alterarDificuldade(dificuldade: number){
    this.ftpForm.controls.dificuldade.setValue(dificuldade);
    console.log(dificuldade);
    console.log('Dificuldade Alterada para: ' + this.retornarDificuldade())
  }

  alterarCustoTotal(custoTotal: String) {
    this.custoTotal = custoTotal;
    console.log(this.custoTotal);
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
    console.log('Tipo')
    console.log('É Privado: ' + this.ftpForm.controls.tipo.value);
  }

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

  limpar() {
    this.ftpForm.reset();
    this.ftpForm.controls['id'].setValue(null);
    this.ftpForm.controls['status'].setValue(1);
    this.ftpForm.controls['publicada'].setValue(0);
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
    this.ftpForm.controls.publicada.setValue(publicada); // status de publicada no banco
    this.ftpForm.controls.datahora.setValue(new Date());
    this.dirtyAll();

    if (ftp.id != null) {
      this.ftpService.atualizarFTP(ftp).subscribe( resp => {
        this.toastr.success('Ficha Técnica de Preparo atualizada com sucesso!');
        this.limpar();
      }, error => {
        this.toastr.error(error.error);
      });
    } else {
      this.ftpService.salvarFTP(ftp)
        .subscribe(resp => {
          this.toastr.success('Ficha Técnica de Preparo cadastrada com sucesso!');
          this.limpar();
        }, error => {
          this.toastr.error(error.error);
        });
    }
  }
}
