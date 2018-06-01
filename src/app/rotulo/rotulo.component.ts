import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { RotuloIngredientesComponent } from './rotulo-ingredientes/rotulo-ingredientes.component';
import { FtpService } from '../ftp/ftp.service';
import { IngredienteService } from '../ingrediente/ingrediente.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Ftp } from '../ftp/ftp';
import { Ingrediente } from '../ingrediente/ingrediente';
import { RotuloIngredientesAtributosComponent } from './rotulo-ingredientes-atributos/rotulo-ingredientes-atributos.component';

@Component({
  selector: 'app-rotulo',
  templateUrl: './rotulo.component.html',
  styleUrls: ['./rotulo.component.css']
})
export class RotuloComponent implements OnInit {

  @ViewChild(RotuloIngredientesComponent) componentePorcaoIngrediente;
  @ViewChild(RotuloIngredientesAtributosComponent) componenteAtributosIngredientes;

  ftp: Ftp;
  gramasPorPorcao?: number;

  ingredienteValorPorcao = Array<{ingrediente: Ingrediente, valor: number}>()

  @Input()
  permitirInputValorPorcao: boolean = true;
  

  constructor(
    private ftpService: FtpService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService) {    
      
      let receita;
      this.route.params.subscribe(params => receita = params);
  
      if (receita.id !== undefined) {
        this.ftpService.obterFTP(receita.id)
          .subscribe(res => {
            this.ftp = res;
            this.ftp.receitaIngrediente.sort((a, b) => {
              if (a.pesoG == b.pesoG) {
                if (a.ingrediente.nome.toLowerCase() < b.ingrediente.nome.toLowerCase()) return -1;
                if (a.ingrediente.nome.toLowerCase() > b.ingrediente.nome.toLowerCase()) return 1;
              }
              if (a.pesoG < b.pesoG) return 1;
              if (a.pesoG > b.pesoG) return -1;
            })
            this.resetarGramasPorPorcao();
                });
      } else {
        this.toastr.error('Redirecionando', 'Não foi possível carregar uma receita.');
      }
  }

  resetarGramasPorPorcao() {
    this.gramasPorPorcao = this.gramasPorPorcao = Number(this.ftp.peso) / Number(this.ftp.rendimento) as number;
    if (this.componentePorcaoIngrediente !== undefined) {
      this.componentePorcaoIngrediente.gramasPorPorcao = this.gramasPorPorcao;
    }
  }

  ngOnInit() {
  }

}
