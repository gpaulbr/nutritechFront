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
import { Atributo } from '../atributo/atributo';
import { AtributoService } from '../atributo/atributo.service';

@Component({
  selector: 'app-rotulo',
  templateUrl: './rotulo.component.html',
  styleUrls: ['./rotulo.component.css']
})
export class RotuloComponent {

  @ViewChild(RotuloIngredientesComponent) componentRotuloIngrediente;
  @ViewChild(RotuloIngredientesAtributosComponent) componentRotuloIngredienteAtributos;
  @ViewChild(RotuloValorEnergeticoComponent) componentRotuloValorEnergetico;

  ftp: Ftp;
  todosAtributos: Array<Atributo>;
  
  gramasPorPorcao?: number;
  
  ingredienteValorPorcao: any;
  nutrientesValorPorcao: any;
  valorEnergeticoPorcao: any;

  vd = [
    { },
  ];

  @Input()
  permitirInputValorPorcao: boolean = true;
  

  constructor(
    private ftpService: FtpService,
    private atributeService: AtributoService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService) {    
      
      let receita;
      this.route.params.subscribe(params => receita = params);
  
      if (this.todosAtributos === undefined) {
        this.atributeService.buscarAtributos().subscribe(response => {
          this.todosAtributos = Array.from(response['Atributos']) as Array<Atributo>;
          this.todosAtributos.sort((a, b) => {
            if (a.id < b.id) return -1;
            if (a.id > b.id) return 1;
          });
        });
      }

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
      }
  }

  emitirValores() {
    this.componentRotuloIngrediente.salvar();
    this.componentRotuloIngredienteAtributos.salvar();
    this.componentRotuloValorEnergetico.salvar();
  }

  alterarIngredienteValor(ingValor: any) {
    this.ingredienteValorPorcao = ingValor;
    // console.log(this.ingredienteValorPorcao)
  }

  alterarNutrienteValor(nutrValor: any) {
    this.nutrientesValorPorcao = nutrValor;
    // console.log(this.nutrientesValorPorcao)
  }

  alterarValorEnergetico(enValor: any) {
    this.valorEnergeticoPorcao = enValor;
    console.log(this.nutrientesValorPorcao)
  }

  resetarGramasPorPorcao() {
    if(!this.gramasPorPorcao) { 
      this.gramasPorPorcao = this.gramasPorPorcao = Number(this.ftp.peso) / Number(this.ftp.rendimento) as number;
    }
    this.emitirValores();
  }

}
