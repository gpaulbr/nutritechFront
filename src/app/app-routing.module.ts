import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UsuarioManutencaoComponent } from './usuario/usuario-manutencao/usuario-manutencao.component';
import { IngredienteManutencaoComponent } from './ingrediente/ingrediente-manutencao/ingrediente-manutencao.component';

const routes: Routes = [
  { path: 'usuario', component: UsuarioManutencaoComponent },
  { path: 'ingrediente', component: IngredienteManutencaoComponent }
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
