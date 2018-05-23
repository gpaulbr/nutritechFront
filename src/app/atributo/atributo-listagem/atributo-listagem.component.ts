import { Component, OnInit, ViewChild } from '@angular/core';
import { AtributoService } from '../atributo.service';
import { Response } from '@angular/http/src/static_response';
import { Router } from '@angular/router';
import { Atributo } from '../atributo';
import { Grupo } from '../../grupo/grupo';
import { id } from '@swimlane/ngx-datatable/release/utils';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';

@Component({ //para conseguir modificar o css de ngx-datatable
  selector: 'app-atributo-listagem',
  templateUrl: './atributo-listagem.component.html',
  styleUrls: ['./atributo-listagem.component.css']
})

export class AtributoListagemComponent implements OnInit {

  atributos: Atributo[];
  grupos: Grupo[];
  admin: boolean;
  atributoEmLista:boolean = false;
  rows = [];
  columns = [
    { name: 'Nome' },
    { name: 'Unidade' },
    { name: 'Multiplicador' },
    { name: 'Obrigatório' }
  ];


  @ViewChild(DatatableComponent) table: DatatableComponent;
  
  constructor(private atributoService: AtributoService, private router: Router) {
    this.atributos=[];
   }

  ngOnInit() {
    var usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
    if(usuarioLogado == null) {
      this.router.navigate(['./']);
    }else{
      if(usuarioLogado.tipo == "ADMIN"){  
        this.admin = true;
      } else {
        this.admin = false;
      }
    }

    if(this.admin){//se for admin, exibe com as ações
      this.columns = [
        { prop: 'id', name: 'ID' },
        { name: 'Nome' },
        { name: 'Unidade'},
        { prop: 'multiplicador', name: "Multiplicador" },
        { prop: 'obrigatorio', name: "Obrigatorio"},
        { name: "Ações" }
        //ícones de ação vão no html
      ];
  }else{ //se for prof ou usuário exibe sem as ações
      this.columns = [
        { prop: 'id', name: 'ID' },
        { name: 'Nome' },
        { prop: 'multiplicador', name: "Multiplicador" },
        { name: "Obrigatorio"}
        //ícones de ação vão no html
      ];
   }



    this.atributoService.buscarAtributos().subscribe(
      atributos => {
        this.atributos = atributos['Atributos'];
        var listaA:Atributo [] = [];
        atributos['Atributos'].forEach(p => {
          if(p["obrigatorio"]){ // Troca o boolean em caso de true para a string Sim (Na coluna Obrigatório irá aparecer a string)
            p["obrigatorio"] = 'Sim';
          }else if(!p["obrigatorio"]) // Troca o boolean em caso de false para a String Não (Na coluna Obrigatório irá aparecer a string)
          {
            p["obrigatorio"] = 'Não';
          }
            listaA.push(p); //inlcui na lista
          })
          if(listaA.length!=0){
            this.rows = listaA;
            this.atributoEmLista = true; //Para poder exibir mensagem que não tem nenhum atributo cadastrado
           } else
            this.atributoEmLista = false;
}); 
     console.log (this.atributos);
}
 
updateFilter(event) {
    const val = event.target.value.toLowerCase();
    // filtra por todos os campos da tabela
    const temp = this.atributos.filter(function(d) {
      if(d.nome.toLowerCase().indexOf(val) !== -1 || !val)
           return d.nome.toLowerCase().indexOf(val) !== -1 || !val;
      else if(d.unidade.toLowerCase().indexOf(val) !== -1 || !val)
           return d.unidade.toLowerCase().indexOf(val) !== -1 || !val;
     //else if(d.multiplicador.toLowerCase().indexOf(val) !== -1 || !val)
           //return d.multiplicador.toLowerCase().indexOf(val) !== -1 || !val;
      else if(d.obrigatorio.toString().indexOf(val) !== -1 || !val)
           return d.obrigatorio.toString().indexOf(val) !== -1 || !val;
      // fim do filtro
      "ERRO"
    });

      this.rows = temp;

    // Independente se o filtro muda ou não, sempre irá voltar para a primeira página
    this.table.offset = 0;
  }

}
