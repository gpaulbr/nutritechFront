import { Component, OnInit, ViewChild } from '@angular/core';
import { Ingrediente } from '../ingrediente';
import { IngredienteService } from '../ingrediente.service';
import { Router } from '@angular/router';
import { Usuario } from '../../usuario/usuario';
import { TipoUsuario } from '../../usuario/tipo-usuario.enum';
import { id } from '@swimlane/ngx-datatable/release/utils';
import { DatatableComponent } from '@swimlane/ngx-datatable';

@Component({
  selector: 'filter-demo',
  templateUrl: './ingrediente-listagem.component.html',
  styleUrls: ['./ingrediente-listagem.component.css']
})
export class IngredienteListagemComponent implements OnInit {
  ingredientes: Ingrediente[];
  usuarioLogado: Usuario;
  
  rows = [];
  columns = [
    { name: 'Nome' },
    { name: 'Origem' },
    { prop: 'criador.nome', name: "Criador" },
    { prop: 'criador.id', name: "idCriador" },
    { name: 'Tipo' }
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

    // filter our data
    const temp = this.ingredientes.filter(function(d) {
      return d.nome.toLowerCase().indexOf(val) !== -1 || !val;
    });

    this.rows = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }

}