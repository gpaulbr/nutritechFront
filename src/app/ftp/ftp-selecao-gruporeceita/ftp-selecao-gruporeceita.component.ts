import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {GrupoService} from '../../grupo/grupo.service';
import {GrupoReceita} from '../../ingrediente/grupo-receita';
import {FtpService} from '../ftp.service';

@Component({
  selector: 'app-ftp-selecao-gruporeceita',
  templateUrl: './ftp-selecao-gruporeceita.component.html',
  styleUrls: ['./ftp-selecao-gruporeceita.component.css']
})
export class FtpSelecaoGruporeceitaComponent implements OnInit {

  grupoReceita: GrupoReceita = null;
  gruposDisponiveis: GrupoReceita[];

  constructor(private router: Router, private grupoService: GrupoService) {  }

  @Output()
  salvarGrupoReceita = new EventEmitter<GrupoReceita>();
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
    this.grupoService.buscar().subscribe(
      response => {
        this.gruposDisponiveis = Array.from(response['Grupos']);
        this.gruposDisponiveis.forEach(item => {
          delete item['active'];
        });
      }
    );
  }

  salvar () {
    this.salvarGrupoReceita.emit(this.grupoReceita);
  }
}
