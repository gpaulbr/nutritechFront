import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../usuario';
import { UsuarioService } from '../usuario.service';
import { ToastrService } from 'ngx-toastr';
import { ListagemBaseComponent } from '../../shared/components/listagem-base/listagem-base.component';

@Component({
  selector: 'app-usuario-listagem',
  templateUrl: './usuario-listagem.component.html',
  styleUrls: ['./usuario-listagem.component.css']
})
export class UsuarioListagemComponent extends ListagemBaseComponent implements OnInit {

  usuarios: Usuario[]
  // rows = [];
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
    }else if(usuarioLogado.nome!="Admin"){
      console.log (usuarioLogado);//tirar depois
      this.routerUsuario.navigate(['./ftp-listagem']);
    }
  }

  // excluirIngrediente(index: number) {
  //     let idUsuario = this.usuarios[index].id;
  //     this.usuarioService.excluir(`${idUsuario}`).subscribe(
  //       response => {
  //         this.toastr.success(response['message']);
  //         // this.atualizarGrade();
  //       },
  //       error => {
  //         console.log(error);
  //         this.toastr.error(error.error);
  //       }
  //     );
  // }

}
