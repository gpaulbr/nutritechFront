import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';
import {UsuarioService} from '../../usuario/usuario.service';
import {Usuario} from '../../usuario/usuario';

@Component({
  selector: 'app-ftp-selecao-professor',
  templateUrl: './ftp-selecao-professor.component.html',
  styleUrls: ['./ftp-selecao-professor.component.css']
})
export class FtpSelecaoProfessorComponent implements OnInit {

  professor: Usuario = null;
  professoresDisponiveis: Usuario[];

  constructor(private router: Router, private usuarioService: UsuarioService) { }

  @Output()
  salvarProfessor = new EventEmitter<Usuario>();
  @Input()
  obrigatorio: boolean

  ngOnInit() {
    var usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
    if(usuarioLogado == null) {
      this.router.navigate(['./']);
      return;
    }

    this.loadDB();
  }

  loadDB() {
    this.usuarioService.buscarProfessores().subscribe(
      response => {
        this.professoresDisponiveis = Array.from(response['Usuarios']);
        this.professoresDisponiveis.forEach(item => {
          delete item.senha;
          delete item['valid'];
          // console.log(item);
        });
        // console.log(this.professoresDisponiveis);
      });
  }



  salvar () {
    this.salvarProfessor.emit(this.professor);
    // console.log(this.professor);
  }

}
