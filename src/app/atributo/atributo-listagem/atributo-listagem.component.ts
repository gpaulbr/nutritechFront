import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { AtributoService } from '../atributo.service';
import { Response } from '@angular/http/src/static_response';
import { Router } from '@angular/router';
import { Atributo } from '../atributo';
import { Grupo } from '../../grupo/grupo';
import { id } from '@swimlane/ngx-datatable/release/utils';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { ToastrService } from 'ngx-toastr';
import { ListagemBaseComponent } from '../../shared/components/listagem-base/listagem-base.component';

@Component({ //para conseguir modificar o css de ngx-datatable
  selector: 'app-atributo-listagem',
  templateUrl: './atributo-listagem.component.html',
  styleUrls: ['./atributo-listagem.component.css']
})

export class AtributoListagemComponent extends ListagemBaseComponent implements OnInit {

  admin: boolean;
  atributoEmLista: boolean = false;
  rows = [];
  columns = [
    { name: 'Nome' },
    { name: 'Unidade' },
    { name: 'Multiplicador' },
    { name: 'ValorDiario' },
    { name: 'Obrigatório' }
  ];


  @ViewChild(DatatableComponent) table: DatatableComponent;

  constructor(
    private atributoService: AtributoService,
    private routerAtributo: Router,
    toastr: ToastrService) {
      super(routerAtributo, 'atributo', 'Atributos', atributoService, toastr);
    
  }

  ngOnInit() {
    var usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
    if (usuarioLogado == null) {
      this.routerAtributo.navigate(['./']);
    } else {
      if (usuarioLogado.tipo == "ADMIN") {
        this.admin = true;
      } else {
        this.admin = false;
      }
    }

    if (this.admin) {//se for admin, exibe com as ações
      this.columns = [
        { name: 'Nome' },
        { name: 'Unidade' },


        { name: "Ações" }
        //ícones de ação vão no html
      ];
    } else { //se for prof ou usuário exibe sem as ações
      this.columns = [
        { name: 'Nome' },

        { name: "Obrigatorio" }
        //ícones de ação vão no html
      ];
    }
    
    this.atualizarGrade()
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();

    // filtra por todos os campos da tabela
    const temp = this.objects.filter(function (d) {
      if (d.nome.toLowerCase().indexOf(val) !== -1 || !val)
        return d.nome.toLowerCase().indexOf(val) !== -1 || !val;
      else if (d.id.toString().toLowerCase().indexOf(val) !== -1 || !val)
        return d.id.toString().toLowerCase().indexOf(val) !== -1 || !val;
      else if (d.unidade.toLowerCase().indexOf(val) !== -1 || !val)
        return d.unidade.toLowerCase().indexOf(val) !== -1 || !val;
      //else if(d.multiplicador.toLowerCase().indexOf(val) !== -1 || !val)
      //return d.multiplicador.toLowerCase().indexOf(val) !== -1 || !val;
      else if (d.multiplicador.toString().toLowerCase().indexOf(val) !== -1 || !val)
        return d.multiplicador.toString().toLowerCase().indexOf(val) !== -1 || !val;
      else if (d.obrigatorio.toString().toLowerCase().indexOf(val) !== -1 || !val)
        return d.obrigatorio.toString().toLowerCase().indexOf(val) !== -1 || !val;
      // fim do filtro
      "ERRO"
    });

    this.rows = temp;

    // Independente se o filtro muda ou não, sempre irá voltar para a primeira página
    this.table.offset = 0;
  }
<<<<<<< HEAD
=======

  redirecionarParaCadastro(index: number) {
    this.router.navigate([`./atributo/${this.atributos[index].id}`]);
  }

  deletarAtributo(index: any) {
    console.log("id" + this.atributos[index].id);
    this.atributoService.excluir(`${this.atributos[index].id}`)
      .subscribe(resp => {
        this.toastr.success(resp['message']);
        this.buscarAtributos()
      }, e => {
        this.toastr.error(e.error.message)
      })
  }
>>>>>>> alterações em rótulo de ingredientes
}
