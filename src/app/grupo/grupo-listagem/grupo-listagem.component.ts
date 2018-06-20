import { Component, OnInit, ViewChild } from '@angular/core';
import { GrupoReceita } from '../../ingrediente/grupo-receita';
import { Grupo } from '../grupo';
import { GrupoService } from '../grupo.service';
import { Response } from '@angular/http/src/static_response';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { ListagemBaseComponent } from '../../shared/components/listagem-base/listagem-base.component';

@Component({
  selector: 'app-grupo-listagem',
  templateUrl: './grupo-listagem.component.html',
  styleUrls: ['./grupo-listagem.component.css']
})
export class GrupoListagemComponent extends ListagemBaseComponent implements OnInit {

  
  admin: boolean;
  columns = [];
  @ViewChild(DatatableComponent) table: DatatableComponent;

  constructor(
    private grupoService: GrupoService,
    private routerGrupo: Router,
    toastr: ToastrService) {
      super(routerGrupo, 'grupo', 'Grupos', grupoService, toastr);
  }

  ngOnInit() {
    var usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
    if (usuarioLogado == null) {
      this.routerGrupo.navigate(['./']);
    } else {
        this.admin = usuarioLogado.tipo === "ADMIN";
    }

    if (this.admin) {//se for admin, exibe com as ações
      this.columns = [
        { prop: 'id', name: 'ID' },
        { name: 'Nome' },
        { prop: 'custo', name: "Valor/Porção (g)" },
        { name: "Ações" }
        //ícones de ação vão no html
      ];
    } else {//se for prof ou usuário exibe sem as ações
      this.columns = [
        { prop: 'id', name: 'ID' },
        { name: 'Nome' },
        { prop: 'custo', name: "Valor/Porção (g)" }
        //ícones de ação vão no html
      ];
    }

    this.atualizarGrade();
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();

    // filtra por todos os campos da tabela
    const temp = this.objects.filter(function (d) {
      if (d.nome.toLowerCase().indexOf(val) !== -1 || !val)
        return d.nome.toLowerCase().indexOf(val) !== -1 || !val;
      else if (d.id.toString().indexOf(val) !== -1 || !val)
        return d.id.toString().toLowerCase().indexOf(val) !== -1 || !val;
      else if (d.custo.toString().toLowerCase().indexOf(val) !== -1 || !val)
        return d.custo.toString().toLowerCase().indexOf(val) !== -1 || !val;
      // fim do filtro
      "ERRO"
    });

    this.rows = temp;

    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }
}