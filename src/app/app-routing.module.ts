import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UsuarioManutencaoComponent } from './usuario/usuario-manutencao/usuario-manutencao.component';

const routes: Routes = [
  { path: 'usuario', component: UsuarioManutencaoComponent }
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
