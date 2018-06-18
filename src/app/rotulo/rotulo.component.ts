import { Component, OnInit, ViewChild, Input, ViewChildren } from '@angular/core';
import { RotuloIngredientesComponent } from './rotulo-ingredientes/rotulo-ingredientes.component';
import * as jsPDF from 'jspdf';
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
  mostrarMaisInfo: boolean;

  gramasPorPorcao: number = 0;

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
        this.atributeService.buscar().subscribe(response => {
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
            this.resetar();
          });
      }
  }

  emitirValores() {
    if (this.gramasPorPorcao == null) {
      this.gramasPorPorcao = 0;
    }
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

  alterarValorEnergetico(enValor: any) {
    this.valorEnergeticoPorcao = enValor;
    console.log(this.nutrientesValorPorcao);
  }

  resetar() {
    this.gramasPorPorcao = this.ftp.grupoReceita.custo;
    this.emitirValores();
  }

  getMostrarMaisInfo(): boolean {
    return this.mostrarMaisInfo;
  }

  geraPDF(index: Number){

    var pdf = new jsPDF('p', 'pt','a4');
    var options = {
      format: 'PNG',
      pagesplit: true, 
    }
        pdf.addHTML(document.getElementById("numero"),0,50,options, function (){
          pdf.setFontSize(30);
          pdf.text("Rótulo Nutricional",186,34);
          pdf.setFont("helvetica");
          pdf.setFontType("bold");
        pdf.save('Rotulo.pdf');
      });
   }
}
