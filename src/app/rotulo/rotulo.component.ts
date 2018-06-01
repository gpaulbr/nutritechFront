import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { RotuloIngredientesComponent } from './rotulo-ingredientes/rotulo-ingredientes.component';
import { FtpService } from '../ftp/ftp.service';
import { IngredienteService } from '../ingrediente/ingrediente.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Ftp } from '../ftp/ftp';

@Component({
  selector: 'app-rotulo',
  templateUrl: './rotulo.component.html',
  styleUrls: ['./rotulo.component.css']
})
export class RotuloComponent implements OnInit {

  @Input()
  msgValoresDiarios: String = "(*)% Valores Diários de referência com base em uma dieta de 2.000 kcal ou 8400 kJ. Seus valoers diários podem ser maiores ou menores dependendo de suas necessidades energéticas."

  @ViewChild(RotuloIngredientesComponent) infoNutricional;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService) {
      
  }

  ngOnInit() {
  }

}
