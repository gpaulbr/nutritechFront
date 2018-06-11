import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../usuario';
import { UsuarioService } from '../usuario.service';
import { ToastrService } from 'ngx-toastr';
import { ListagemBaseComponent } from '../../shared/components/listagem-base/listagem-base.component';
import { utf8Encode } from '@angular/compiler/src/util';

@Component({
  selector: 'app-usuario-listagem',
  templateUrl: './usuario-listagem.component.html',
  styleUrls: ['./usuario-listagem.component.css']
})
export class UsuarioListagemComponent extends ListagemBaseComponent implements OnInit {

  columns = [
    { name: 'Nome' },
    { name: 'Email' },
    { name: 'Matricula' },
    { name: 'CPF' },
    { name: 'Tipo' },
    { name: 'Status' },
    { name: "Ações"}
  ];
  
  constructor(
    private routerUsuario: Router,
    private usuarioService: UsuarioService,
    toastr: ToastrService) {
      super(routerUsuario, 'usuario', 'Usuarios', usuarioService, toastr);
      this.atualizarGrade();
    }


  ngOnInit() {
    var usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));

    if(usuarioLogado == null) {  
      this.routerUsuario.navigate(['./']);
    } else if(usuarioLogado.nome!="Admin"){
      this.routerUsuario.navigate(['./ftp-listagem']);
    }
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();
    // filtra por todos os campos da tabela
    const temp = this.objects.filter(function(u) {
      if(u.nome.toLowerCase().indexOf(val) !== -1 || !val)
            return u.nome.toLowerCase().indexOf(val) !== -1 || !val;
      else if(u.email.toLowerCase().indexOf(val) !== -1 || !val)
            return u.email.toLowerCase().indexOf(val) !== -1 || !val;
      else if(u.cpf.toLowerCase().indexOf(val) !== -1 || !val)
            return u.cpf.toLowerCase().indexOf(val) !== -1 || !val;
      else if(u.matricula.toString().toLowerCase().indexOf(val) !== -1 || !val)
            return u.matricula.toString().toLowerCase().indexOf(val) !== -1 || !val;
      else if(u.tipo.toString().toLowerCase().indexOf(val) !== -1 || !val)
            return u.tipo.toString().toLowerCase().indexOf(val) !== -1 || !val;
      else if(u.status.toString().toLowerCase().indexOf(val) !== -1 || !val)
            return u.status.toString().toLowerCase().indexOf(val) !== -1 || !val;
      // fim do filtro
      "ERRO"
    });
      this.rows = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }

}
