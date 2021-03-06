import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {LocationStrategy, HashLocationStrategy} from '@angular/common'

import { AppComponent } from './app.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AppRoutingModule } from './/app-routing.module';
import { HttpModule } from '@angular/http';
import { HttpClient, HttpHandler, HttpClientModule } from '@angular/common/http';
import { CpfCnpjModule } from 'ng2-cpf-cnpj';
import { TextMaskModule } from 'angular2-text-mask';
import { HeaderComponent } from './header/header.component';
import { UsuarioManutencaoComponent } from './usuario/usuario-manutencao/usuario-manutencao.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RadioButtonComponent } from './shared/components/radio-button/radio-button.component';
import { GrupoManutencaoComponent } from './grupo/grupo-manutencao/grupo-manutencao.component';
import { MensagemErroComponent } from './shared/components/mensagem-erro/mensagem-erro.component';
import { IngredienteCadastroComponent } from './ingrediente/ingrediente-cadastro/ingrediente-cadastro.component';
import { AtributoService } from './atributo/atributo.service';
import { IngredienteService } from './ingrediente/ingrediente.service';
import { UsuarioListagemComponent } from './usuario/usuario-listagem/usuario-listagem.component';
import { IngredienteListagemComponent } from './ingrediente/ingrediente-listagem/ingrediente-listagem.component';
import { FTPCadastroComponent } from './ftp/ftp-cadastro/ftp-cadastro.component';
import { AtributoManutencaoComponent } from './atributo/atributo-manutencao/atributo-manutencao.component';
import { GrupoListagemComponent } from './grupo/grupo-listagem/grupo-listagem.component';
import { LoginComponent } from './login/login.component';
import { GrupoService } from './grupo/grupo.service';
import { UsuarioService } from './usuario/usuario.service';
import { LoginService } from './login/login.service';
import { AtributoListagemComponent } from './atributo/atributo-listagem/atributo-listagem.component';
import { FtpListagemComponent } from './ftp/ftp-listagem/ftp-listagem.component';
import { FtpService } from './ftp/ftp.service';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { FtpModoPreparoComponent } from './ftp/ftp-modo-preparo/ftp-modo-preparo.component';
import { FtpDificuldadeComponent } from './ftp/ftp-dificuldade/ftp-dificuldade.component';
import { FtpIntegrantesComponent } from './ftp/ftp-integrantes/ftp-integrantes.component';
import { FtpSelecaoIngredientesComponent } from './ftp/ftp-selecao-ingredientes/ftp-selecao-ingredientes.component';
import { FtpImageFileUploadComponent } from './ftp/ftp-image-file-upload/ftp-image-file-upload.component';
import { OnlyNumber } from './shared/directives/only-number.directive';
import { FtpSelecaoProfessorComponent } from './ftp/ftp-selecao-professor/ftp-selecao-professor.component';
import { FtpSelecaoGruporeceitaComponent } from './ftp/ftp-selecao-gruporeceita/ftp-selecao-gruporeceita.component';
import { RotuloComponent } from './rotulo/rotulo.component';
import { RotuloIngredientesComponent } from './rotulo/rotulo-ingredientes/rotulo-ingredientes.component';
import { RotuloIngredientesAtributosComponent } from './rotulo/rotulo-ingredientes-atributos/rotulo-ingredientes-atributos.component';
import { RotuloValorEnergeticoComponent } from './rotulo/rotulo-valor-energetico/rotulo-valor-energetico.component';
import { RotuloInfoNutricionalComponent } from './rotulo/rotulo-info-nutricional/rotulo-info-nutricional.component';


@NgModule({
  declarations: [
    AppComponent,
    UsuarioManutencaoComponent,
    HeaderComponent,
    GrupoManutencaoComponent,
    RadioButtonComponent,
    MensagemErroComponent,
    IngredienteCadastroComponent,
    UsuarioListagemComponent,
    IngredienteListagemComponent,
    FTPCadastroComponent,
    AtributoManutencaoComponent,
    GrupoListagemComponent,
    AtributoListagemComponent,
    LoginComponent,
    FtpListagemComponent,
    OnlyNumber,
    FtpModoPreparoComponent,
    FtpDificuldadeComponent,
    FtpIntegrantesComponent,
    FtpSelecaoIngredientesComponent,
    FtpImageFileUploadComponent,
    FtpSelecaoProfessorComponent,
    FtpSelecaoGruporeceitaComponent,
    RotuloComponent,
    RotuloIngredientesComponent,
    RotuloIngredientesAtributosComponent,
    RotuloValorEnergeticoComponent,
    RotuloInfoNutricionalComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    CpfCnpjModule,
    TextMaskModule,
    NgxDatatableModule,
    CommonModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
  ],
  providers: [
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    AtributoService,
    IngredienteService,
    GrupoService,
    UsuarioService,
    LoginService,
    FtpService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
