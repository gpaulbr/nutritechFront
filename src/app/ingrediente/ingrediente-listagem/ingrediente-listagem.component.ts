import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Ingrediente } from '../ingrediente';
import { IngredienteService } from '../ingrediente.service';
import { Router } from '@angular/router';
import { Usuario } from '../../usuario/usuario';
import { TipoUsuario } from '../../usuario/tipo-usuario.enum';
import { id } from '@swimlane/ngx-datatable/release/utils';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { ToastrService } from 'ngx-toastr';
import { UsuarioLogadoDto } from '../../usuario/usuario-logado-dto';
import { ListagemBaseComponent } from '../../shared/components/listagem-base/listagem-base.component';

@Component({
  //encapsulation: ViewEncapsulation.None,//para consegguir modificar o css de ngx-datatable
  selector: 'filter-demo',
  templateUrl: './ingrediente-listagem.component.html',
  styleUrls: ['./ingrediente-listagem.component.css'],
  
})

export class IngredienteListagemComponent extends ListagemBaseComponent implements OnInit {
  
  rows = [];
  columns = [
    { name: 'Nome' },
    { name: 'Origem' },
    { prop: 'criador.nome', name: "Criador" },
    { name: 'Tipo' },
    { name: 'Ações' }
  ];

  @ViewChild(DatatableComponent) table: DatatableComponent;

  constructor(
    private routerIngrediente: Router,
    private ingredienteService: IngredienteService,
    toastr: ToastrService) {
      super(routerIngrediente, 'ingrediente', 'Ingredientes', ingredienteService, toastr);
     }

   ngOnInit() {
    this.usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
    if(this.usuarioLogado == null) {
      this.routerIngrediente.navigate(['./']);
    }
    this.atualizarGrade();
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();

    // filtra por todos os campos da tabela
    const temp = this.objects.filter(function(d) {
      if(d.nome.toLowerCase().indexOf(val) !== -1 || !val)
            return d.nome.toLowerCase().indexOf(val) !== -1 || !val;
      else if(d.origem.toLowerCase().indexOf(val) !== -1 || !val)
            return d.origem.toLowerCase().indexOf(val) !== -1 || !val;
      else if(d.criador.nome.toLowerCase().indexOf(val) !== -1 || !val)
            return d.criador.nome.toLowerCase().indexOf(val) !== -1 || !val;
      else if(d.tipo.toString().toLowerCase().indexOf(val) !== -1 || !val)
            return d.tipo.toString().toLowerCase().indexOf(val) !== -1 || !val;
      // fim do filtro
      "ERRO"
    });
      this.rows = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }
  
  listaVazia(): boolean {
    return this.rows.length === 0;
  }

}