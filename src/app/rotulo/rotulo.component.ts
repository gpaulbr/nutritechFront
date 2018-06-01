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

  @ViewChild(RotuloIngredientesComponent) infoNutricional;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService) {
      
  }

  ngOnInit() {
  }

}
