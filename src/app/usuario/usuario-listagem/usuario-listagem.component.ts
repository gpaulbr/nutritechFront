import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../usuario';
import { UsuarioService } from '../usuario.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-usuario-listagem',
  templateUrl: './usuario-listagem.component.html',
  styleUrls: ['./usuario-listagem.component.css']
})
export class UsuarioListagemComponent implements OnInit {

  usuarios: Usuario[]
  rows = [];
  columns = [
    { name: 'Nome' },
    { name: 'Email' },
    { name: 'Matricula' },
    { name: 'CPF' },
    { name: 'Tipo' },
    { name: 'Status' },
    { name: "Ações"}
  ];

  constructor(private router: Router,
    private usuarioService: UsuarioService,
    private toastr: ToastrService) { }


  ngOnInit() {
    var usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));

    if(usuarioLogado == null) {
      this.router.navigate(['./']);
    }else if(usuarioLogado.nome!="Admin"){
      console.log (usuarioLogado);//tirar depois
      this.router.navigate(['./ftp-listagem']);
    }

    // this.usuarioService.buscarUsuarios().subscribe(
    //   response => {
    //     this.usuarios = response['Usuarios'];
    //     console.log (this.usuarios);
    //   }
    // )
    this.atualizarGrade();
  }

  atualizarGrade() {
    this.usuarioService.buscarUsuarios().subscribe(
      response => {
        this.usuarios = response['Usuarios'];
        console.log(this.usuarios)
        this.usuarios.forEach(p => {
            if(p.cpf.length === 11) {
              p.cpf = p.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g,"\$1.\$2.\$3\-\$4");
            }
            this.rows.push(p)
        });
      });
  }

  redirecionarParaCadastro(index: number) {
    this.router.navigate([`./usuario/${this.usuarios[index].id}`]);
  }

  excluirIngrediente(index: number) {
      let idUsuario = this.usuarios[index].id;
      this.usuarioService.excluirUsuario(`${idUsuario}`).subscribe(
        response => {
          this.toastr.success(response['message']);
          // this.atualizarGrade();
        },
        error => {
          console.log(error);
          this.toastr.error(error.error);
        }
      );
  }

}
