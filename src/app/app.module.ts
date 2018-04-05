import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


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
import { IngredienteManutencaoComponent } from './ingrediente/ingrediente-manutencao/ingrediente-manutencao.component';
import { GrupoManutencaoComponent } from './grupo/grupo-manutencao/grupo-manutencao.component';
import { MensagemErroComponent } from './shared/components/mensagem-erro/mensagem-erro.component';
import { IngredienteCadastroComponent } from './ingrediente/ingrediente-cadastro/ingrediente-cadastro.component';
import { AtributoService } from './atributo/atributo.service';
import { IngredienteService } from './ingrediente/ingrediente.service';
import { UsuarioListagemComponent } from './usuario/usuario-listagem/usuario-listagem.component';
import { IngredienteListagemComponent } from './ingrediente/ingrediente-listagem/ingrediente-listagem.component';
import { FTPCadastroComponent } from './ftp/ftp-cadastro/ftp-cadastro.component';



@NgModule({
  declarations: [
    AppComponent,
    UsuarioManutencaoComponent,
    HeaderComponent,
    IngredienteManutencaoComponent,
    GrupoManutencaoComponent,
    RadioButtonComponent,
    MensagemErroComponent,
    IngredienteCadastroComponent,
    UsuarioListagemComponent,
    IngredienteListagemComponent,
    FTPCadastroComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    CpfCnpjModule,
    TextMaskModule
  ],
  providers: [AtributoService, IngredienteService],
  bootstrap: [AppComponent]
})
export class AppModule { }
