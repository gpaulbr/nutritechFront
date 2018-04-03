import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UsuarioManutencaoComponent } from './usuario/usuario-manutencao/usuario-manutencao.component';
import { IngredienteManutencaoComponent } from './ingrediente/ingrediente-manutencao/ingrediente-manutencao.component';
import { GrupoManutencaoComponent } from './grupo/grupo-manutencao/grupo-manutencao.component';
import { IngredienteCadastroComponent } from './ingrediente/ingrediente-cadastro/ingrediente-cadastro.component';
import { UsuarioListagemComponent } from './usuario/usuario-listagem/usuario-listagem.component';
import { IngredienteListagemComponent } from './ingrediente/ingrediente-listagem/ingrediente-listagem.component';

const routes: Routes = [
  { path: 'usuario', component: UsuarioManutencaoComponent },
  { path: 'ingrediente', component: IngredienteManutencaoComponent },
  { path: 'grupo', component: GrupoManutencaoComponent },
  { path: 'cadastroIngrediente', component: IngredienteCadastroComponent },
  { path: 'usuario-listagem', component: UsuarioListagemComponent },
  { path: 'ingrediente-listagem', component: IngredienteListagemComponent }
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
