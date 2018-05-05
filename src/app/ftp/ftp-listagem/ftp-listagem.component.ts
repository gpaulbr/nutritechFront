import { Component, OnInit, ViewChild } from '@angular/core';
import { Ftp } from '../ftp';
import { FtpService } from '../ftp.service';
import { Router } from '@angular/router';
import { Usuario } from '../../usuario/usuario';
import { TipoUsuario } from '../../usuario/tipo-usuario.enum';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { create } from 'domain';


@Component({
   selector: 'filter-demo app-ftp-listagem',
  templateUrl: './ftp-listagem.component.html',
  styleUrls: ['./ftp-listagem.component.css']
})
export class FtpListagemComponent implements OnInit {
  public receitaRestrita:boolean;
  receitas: Ftp[]; //lista de receitas
  usuarioLogado: Usuario;
  rows = [];
  columns = [
    { name: 'Nome' },
    { name: 'Rendimento' },
    { name: 'Status' },
    { name: 'Tipo' },
    { prop: 'criador', name: "Criadores"},
    //{ prop: "'MERADA'", name: "Criadores" },
    { prop: 'grupoReceita.nome', name: "Grupo" }
  ];

  @ViewChild(DatatableComponent) table: DatatableComponent;//erro no import
  
  constructor(private router: Router, private ftpServices: FtpService) { //variável da classe FtpService
    this.receitas = [];//inciando o array      
  
    }

  ngOnInit() {
    this.usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
    if(this.usuarioLogado == null) {  //só libera após login
      this.router.navigate(['./']);
    }  

    this.ftpServices.buscarFTP().subscribe(receitas =>{
         this.receitas = receitas["Receitas"];//acesso o que o método buscarReceita
         var lista:Ftp [] = [];
         receitas['Receitas'].forEach(p => {
          let stringCriadores: String = ""; // cria uma string vazia para concaternamos os nomes
          p['criadores'].forEach(u => {
            stringCriadores += u.nome + "<br>"; // concatena cada nome de criador de receita
          });
          p['criador'] = stringCriadores
          //p['criador'] = p['criadores'][0].nome;
          lista.push(p);
          //console.log( p['criador']);
        })
        //console.log(lista);
        this.rows = lista;
    });
    //console.log(criador.id);
    }

        updateFilter(event) {
          const val = event.target.value.toLowerCase();
      
          // filtra por todos os campos da tabela
          const temp = this.receitas.filter(function(d) {
            if(d.nome.toLowerCase().indexOf(val) !== -1 || !val)
                  return d.nome.toLowerCase().indexOf(val) !== -1 || !val;
            if(d.rendimento.toString().toLowerCase().indexOf(val) !== -1 || !val)
                  return d.rendimento.toString().toLowerCase().indexOf(val) !== -1 || !val;
            /*else if(d.criador.toLowerCase().indexOf(val) !== -1 || !val) 
                  return d.criador.toLowerCase().indexOf(val) !== -1 || !val;*/
            else if(d.tipo.toString().toLowerCase().indexOf(val) !== -1 || !val)
                  return d.tipo.toString().toLowerCase().indexOf(val) !== -1 || !val;
          
          });
      
            this.rows = temp;
      
          // Whenever the filter changes, always go back to the first page
          this.table.offset = 0;
        }

  teste(){
    console.log(this.receitas) //retirar depois de testar
  }
  chamaNome(){
    //
  }
}