import { Component, OnInit, ViewChild } from '@angular/core';
import { GrupoReceita } from '../../ingrediente/grupo-receita';
import { Grupo } from '../grupo';
import { GrupoService } from '../grupo.service';
import { Response } from '@angular/http/src/static_response';
import { Router } from '@angular/router';
import { DatatableComponent } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-grupo-listagem',
  templateUrl: './grupo-listagem.component.html',
  styleUrls: ['./grupo-listagem.component.css']
})
export class GrupoListagemComponent implements OnInit {

  grupos: Grupo[];
  rows = [];
  columns = [
    { prop: 'id', name: 'ID' },
    { name: 'Nome' },
    { prop: 'custo', name: "Valor da Porção (g)" }
    //ações vão no html
  ];

  @ViewChild(DatatableComponent) table: DatatableComponent;

  constructor(
    private grupoService: GrupoService,
    private router: Router) {
   }

  ngOnInit() {
    var usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
    if(usuarioLogado == null) {
      this.router.navigate(['./']);
    }

    this.grupoService.buscarGrupos().subscribe(
      response => {
        this.grupos = response['Grupos'];

        let lista = []

        response['Grupos'].forEach(p => {
            lista.push(p)
          })
        
        this.rows = lista;
        });

        console.log (this.grupos);
      }

      updateFilter(event) {
        const val = event.target.value.toLowerCase();
    
        // filtra por todos os campos da tabela
        const temp = this.grupos.filter(function(d) {
          if(d.nome.toLowerCase().indexOf(val) !== -1 || !val)
                return d.nome.toLowerCase().indexOf(val) !== -1 || !val;
          else if(d.id.toString().indexOf(val) !== -1 || !val)
                return d.id.toString().toLowerCase().indexOf(val) !== -1 || !val;
          else if(d.custo.toString().toLowerCase().indexOf(val) !== -1 || !val)
                return d.custo.toString().toLowerCase().indexOf(val) !== -1 || !val;
          // fim do filtro
          "ERRO"
        });
    
          this.rows = temp;
    
        // Whenever the filter changes, always go back to the first page
        this.table.offset = 0;
      }

  }