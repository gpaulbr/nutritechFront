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
  professoresDisponiveis: Array<Usuario> = new Array<Usuario>();
  dropdown: HTMLInputElement;

  constructor(private router: Router, private usuarioService: UsuarioService) { }

  @Output()
  salvarProfessor = new EventEmitter<Usuario>();
  @Input()
  obrigatorio: boolean
  @Input()
  podeAlterar: boolean

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
        let professores = Array.from(response['Usuarios']) as Array<Usuario>;
        professores.forEach(item => {
          delete item.senha;
          delete item['valid'];
          if (item.status == true) {
            this.professoresDisponiveis.push(item);
          }
        });
      });
  }



  salvar () {
    this.salvarProfessor.emit(this.professor);
  }

}
