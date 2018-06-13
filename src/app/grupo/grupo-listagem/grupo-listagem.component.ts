import { Component, OnInit, ViewChild } from '@angular/core';
import { GrupoReceita } from '../../ingrediente/grupo-receita';
import { Grupo } from '../grupo';
import { GrupoService } from '../grupo.service';
import { Response } from '@angular/http/src/static_response';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DatatableComponent } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-grupo-listagem',
  templateUrl: './grupo-listagem.component.html',
  styleUrls: ['./grupo-listagem.component.css']
})
export class GrupoListagemComponent implements OnInit {

  grupos: Grupo[];
  rows = [];
  grupoEmLista:boolean = false;
  admin: boolean;
  columns = [];
  @ViewChild(DatatableComponent) table: DatatableComponent;

  constructor(
    private grupoService: GrupoService,
    private router: Router,
    private toastr: ToastrService) {
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
        { prop: 'id', name: 'Id' },
        { name: 'Nome' },
        { prop: 'custo', name: "Valor/Porção (g)" },
        { name: "Ações" }
        //ícones de ação vão no html
      ];
    } else {//se for prof ou usuário exibe sem as ações
      this.columns = [
        { prop: 'id', name: 'Id' },
        { name: 'Nome' },
        { prop: 'custo', name: "Valor/Porção (g)" }
        //ícones de ação vão no html
      ];
    }

    this.listGrupos()
  }

  listGrupos(){
    this.grupoService.buscarGrupos().subscribe(
      response => {
        this.grupos = response['Grupos'];

        let lista = []

        response['Grupos'].forEach(p => {
          lista.push(p)
        })
        if(lista.length!=0){
          this.rows = lista;
          this.grupoEmLista = true;//para exibir mensagem se não tiver nda cadastrado
        }
        else
          this.grupoEmLista = false;
      });
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();

    // filtra por todos os campos da tabela
    const temp = this.grupos.filter(function (d) {
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

  redirecionarParaCadastro(index: number) {
    console.log("teste: "
      + this.grupos[index].id);
    this.router.navigate([`./grupo/${this.grupos[index].id}`]);
  }

  deletarGrupo(index: any) {
    console.log(this.grupos[index])

    this.grupoService.excluirGrupo(this.grupos[index].id)
      .subscribe(resp => {
        this.toastr.success(resp.message);
        this.listGrupos()
      }, e => {
        this.toastr.error(e.error.message);
      })
      // window.location.reload();/* só pra atualizar após deletar precisamos */
  }
}