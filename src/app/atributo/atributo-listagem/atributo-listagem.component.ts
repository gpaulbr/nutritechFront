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

@Component({ //para conseguir modificar o css de ngx-datatable
  selector: 'app-atributo-listagem',
  templateUrl: './atributo-listagem.component.html',
  styleUrls: ['./atributo-listagem.component.css']
})

export class AtributoListagemComponent implements OnInit {

  atributos: Atributo[];
  grupos: Grupo[];
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
    private router: Router,
    private toastr: ToastrService) {
    this.atributos = [];
  }

  ngOnInit() {
    var usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
    if (usuarioLogado == null) {
      this.router.navigate(['./']);
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
    
    this.buscarAtributos()
  }

  buscarAtributos() {
    this.atributoService.buscarAtributos().subscribe(
      atributos => {
        this.atributos = atributos['Atributos'];
        debugger;
        var listaA: Atributo[] = [];
        atributos['Atributos'].forEach(p => {
          if (p["obrigatorio"]) { // Troca o boolean em caso de true para a string Sim (Na coluna Obrigatório irá aparecer a string)
            p["obrigatorio"] = 'Sim';
          } else if (!p["obrigatorio"]) // Troca o boolean em caso de false para a String Não (Na coluna Obrigatório irá aparecer a string)
          {
            p["obrigatorio"] = 'Não';
          }
          listaA.push(p); //inlcui na lista        
        })
          this.rows = listaA;
      });
    //console.log(this.atributos);
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();

    // filtra por todos os campos da tabela
    const temp = this.atributos.filter(function (d) {
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

  redirecionarParaCadastro(index: number) {
    this.router.navigate([`./atributo/${this.atributos[index].id}`]);
  }

  deletarAtributo(index: any) {
    console.log("id" + this.atributos[index].id);
    this.atributoService.excluirAtributo(this.atributos[index].id)
      .subscribe(resp => {
        this.toastr.success(resp.message)
        this.buscarAtributos()
      }, e => {
        this.toastr.error(e.error.message)
      })
  }
}
