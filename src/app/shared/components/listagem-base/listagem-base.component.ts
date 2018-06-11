import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioLogadoDto } from '../../../usuario/usuario-logado-dto';
import { ServiceBase } from '../../interfaces/service-base';
import { ToastrService } from 'ngx-toastr';
import { DatatableComponent } from '@swimlane/ngx-datatable';

export abstract class ListagemBaseComponent implements OnInit {


  usuarioLogado: UsuarioLogadoDto
  nomeObjeto: string;
  nomeObjetoService: string
  rows = [];
  objects = [];
  service: ServiceBase;
  @ViewChild(DatatableComponent) table: DatatableComponent;

  constructor(
    private router: Router,
    nomeObjeto: string,
    nomeObjetoService: string,
    service: ServiceBase,
    private toastr: ToastrService,
  ) {
    this.nomeObjeto = nomeObjeto;
    this.service = service;
    this.nomeObjetoService = nomeObjetoService;
  }

  ngOnInit() {
    this.usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
  }

  redirecionarParaCadastro(index: number) {
    this.router.navigate([`./${this.nomeObjeto}/${this.rows[index].id}`]);
  }

  atualizarGrade() {
    this.service.buscar().subscribe(
      response => { 
        this.rows = response[this.nomeObjetoService];
        this.objects = this.rows;
      });
  }

  excluir(index: number) {
    let id = this.rows[index].id;
    this.service.excluir(`${id}`).subscribe(
      response => {
        this.toastr.success(response['message']);
        this.atualizarGrade();
      },
      error => {
        console.log(error);
        this.toastr.error(error.error);
      }
    );
  }

}
