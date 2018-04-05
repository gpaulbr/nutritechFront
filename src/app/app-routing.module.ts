import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UsuarioManutencaoComponent } from './usuario/usuario-manutencao/usuario-manutencao.component';
import { IngredienteManutencaoComponent } from './ingrediente/ingrediente-manutencao/ingrediente-manutencao.component';
import { GrupoManutencaoComponent } from './grupo/grupo-manutencao/grupo-manutencao.component';
import { IngredienteCadastroComponent } from './ingrediente/ingrediente-cadastro/ingrediente-cadastro.component';
import { UsuarioListagemComponent } from './usuario/usuario-listagem/usuario-listagem.component';
import { IngredienteListagemComponent } from './ingrediente/ingrediente-listagem/ingrediente-listagem.component';
import { FTPCadastroComponent } from './ftp/ftp-cadastro/ftp-cadastro.component';
import { GrupoListagemComponent } from './grupo/grupo-listagem/grupo-listagem.component';
import { AtributoManutencaoComponent } from './atributo/atributo-manutencao/atributo-manutencao.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: 'usuario', component: UsuarioManutencaoComponent },
  { path: 'ingrediente', component: IngredienteManutencaoComponent },
  { path: 'grupo', component: GrupoManutencaoComponent },
  { path: 'atributo', component: AtributoManutencaoComponent},
  { path: 'cadastroIngrediente', component: IngredienteCadastroComponent },
  { path: 'usuario-listagem', component: UsuarioListagemComponent },
  { path: 'ingrediente-listagem', component: IngredienteListagemComponent },
  { path: 'grupo-listagem', component: GrupoListagemComponent },
  { path: 'ftp-cadastro', component: FTPCadastroComponent },
  { path: '', component: LoginComponent },
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {

}
