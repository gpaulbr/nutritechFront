import { Component, OnInit, ViewChild, Input, ViewChildren } from '@angular/core';
import { RotuloIngredientesComponent } from './rotulo-ingredientes/rotulo-ingredientes.component';
import { FtpService } from '../ftp/ftp.service';
import { IngredienteService } from '../ingrediente/ingrediente.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Ftp } from '../ftp/ftp';
import { Ingrediente } from '../ingrediente/ingrediente';
import { RotuloIngredientesAtributosComponent } from './rotulo-ingredientes-atributos/rotulo-ingredientes-atributos.component';
import { RotuloValorEnergeticoComponent } from './rotulo-valor-energetico/rotulo-valor-energetico.component';

@Component({
  selector: 'app-rotulo',
  templateUrl: './rotulo.component.html',
  styleUrls: ['./rotulo.component.css']
})
export class RotuloComponent implements OnInit {

  @ViewChild(RotuloIngredientesComponent) componentRotuloIngrediente;
  @ViewChild(RotuloIngredientesAtributosComponent) componentRotuloIngredienteAtributos;
  @ViewChild(RotuloValorEnergeticoComponent) componentRotuloValorEnergetico;

  ftp: Ftp;
  gramasPorPorcao?: number;
  ingredienteValorPorcao: any;
  nutrientesValorPorcao: any;

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

  emitirValores() {
    this.componentRotuloIngrediente.salvar();
    this.componentRotuloIngredienteAtributos.salvar();
    this.componentRotuloValorEnergetico.salvar();
  }

  alterarIngredienteValor(ingValor: any) {
    this.ingredienteValorPorcao = ingValor;
  }

  alterarNutrienteValor(nutrValor: any) {
    this.nutrientesValorPorcao = nutrValor;
  }

  resetarGramasPorPorcao() {
    this.gramasPorPorcao = this.gramasPorPorcao = Number(this.ftp.peso) / Number(this.ftp.rendimento) as number;
    if (this.ftp !== undefined && this.componentRotuloIngrediente !== undefined) {
      this.componentRotuloIngrediente.gramasPorPorcao = this.gramasPorPorcao;
    }
  }

  ngOnInit() {
  }

}
