import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Ingrediente } from '../ingrediente';
import { IngredienteService } from '../ingrediente.service';
import { Router } from '@angular/router';
import { Usuario } from '../../usuario/usuario';
import { TipoUsuario } from '../../usuario/tipo-usuario.enum';
import { id } from '@swimlane/ngx-datatable/release/utils';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';

@Component({
  //encapsulation: ViewEncapsulation.None,//para consegguir modificar o css de ngx-datatable
  selector: 'filter-demo',
  templateUrl: './ingrediente-listagem.component.html',
  styleUrls: ['./ingrediente-listagem.component.css'],
  
})

export class IngredienteListagemComponent implements OnInit {
  ingredientes: Ingrediente[];
  usuarioLogado: Usuario;
  teste:string;
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
    private router: Router,
    private ingredienteService: IngredienteService) { }

   ngOnInit() {
  
    this.usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
    if(this.usuarioLogado == null) {
      this.router.navigate(['./']);
    }

    this.ingredienteService.buscarIngredientes().subscribe(
      response => { 
        this.ingredientes = response['Ingredientes'];

        let lista = []

        response['Ingredientes'].forEach(p => {
          if(this.usuarioLogado.tipo !== "ADMIN") {//se não for admin vê se é privado ou público
            if(p.tipo === "PRIVADO") {
              if(p.criador.id === this.usuarioLogado.id) {//usuário comum só acessa os próprios, ingredientes PRIVADOS
                lista.push(p)//insere na lista 
              }
            } else {//se não for privado, insere todos o ingrediente na lista
              lista.push(p)
            }
          } else {//o admin deve ter acesso a todos os ingredientes
            lista.push(p)
          }
          
        })

        this.rows = lista
        
      });
  console.log("Usuário logado:" + this.usuarioLogado.tipo);//OK TIRAR
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();

    // filtra por todos os campos da tabela
    const temp = this.ingredientes.filter(function(d) {
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

  redirecionarParaCadastro(index: number){
    debugger;
    this.router.navigate([`./ingrediente/${this.ingredientes[index].id}`]);
  }

}