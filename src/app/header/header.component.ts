import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../usuario/usuario';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(private router: Router) {
   }

   usuarioLogado:Usuario;
  ngOnInit(){
    if(this.usuarioLogado == null) 
      this.router.navigate(['./']);
      
      this.usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));//em teste
    
    console.log(this.opcaoMenu);
    this.router.navigate(['./ftp-listagem']);// SÓ ESTÁ ACONTECENDO DEPOIS QUE ATUALIZA //redireciona para Minhas Receitas o usuário comum e Listagem de Receito o ADM,
    //talvez isso ocorra pq o header não atualiza
  }

  opcaoMenu():boolean{    
    if(this.usuarioLogado.nome=='Admin' || this.usuarioLogado.nome=='Professor'){//por enquanto prof e admin acessam tudo, quando trabalharmos com a questão das turmas, pode ser diferente
      return  true;
    }else if(this.usuarioLogado.nome=='Usuario'){
      return false;
    }
  }

  estaLogado(){
    return JSON.parse(localStorage.getItem('usuarioLogado')) != null;
  }

  logout(){
    localStorage.clear();
    this.router.navigate(['./']);
  }
}
