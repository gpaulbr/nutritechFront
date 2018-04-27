import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FtpService } from '../ftp.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Ftp } from '../ftp';
import { Time } from '@angular/common';
import { Usuario } from '../../usuario/usuario';
import { TipoIngrediente } from '../../ingrediente/tipo-ingrediente.enum';
import { debug } from 'util';

@Component({
  selector: 'ftp-cadastro',
  templateUrl: './ftp-cadastro.component.html',
  styleUrls: ['./ftp-cadastro.component.css']
})
export class FTPCadastroComponent implements OnInit {

  ftpForm: FormGroup
  fb: FormBuilder

  constructor(private ftpService: FtpService,
    private router: Router,
    fb: FormBuilder) {
    this.fb = new FormBuilder();
    this.ftpForm = this.fb.group({
      /**/nome: [null, Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(50)])],
      //status: [null, Validators.compose([Validators.required])],
      passos: [null, Validators.compose([Validators.required])],
      rendimento: [null, Validators.compose([Validators.required])],
      tempo: [null, Validators.compose([Validators.required])],
      peso: [null, Validators.compose([Validators.required])],
      //imagem: [null, Validators.compose([Validators.required])],
      tipo: [false, Validators.compose([Validators.required])],
      criadores: [null, Validators.compose([Validators.required])],
      ingredientes: [null, Validators.compose([Validators.required])],
      professor: [null, Validators.compose([Validators.required])],
      //data: [null, Validators.compose([Validators.required])],
      //hora: [null, Validators.compose([Validators.required])],
      grupoReceita: [null, Validators.compose([Validators.required])]
    })
   }
   
  ngOnInit() {
    var usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
    if(usuarioLogado == null) {  
      this.router.navigate(['./']);
    }
  }

  cadastrar(ftp: Ftp) {
    ftp.status = true;
    ftp.imagem = "url/img.jpg"
    ftp.data = new Date(Date.now());
    // ftp.horario.hours = ftp.data.getHours();
    // ftp.horario.minutes = ftp.data.getMinutes();

    this.ftpService.salvarFTP(ftp)
    .subscribe(resp => {
      alert("Ficha Técnica de Preparo cadastrada com sucesso!");
    }, erro =>{
      alert("Erro no cadastro!");
    })
  }

  salvarPassos(passos: Array<String>){
    console.log(passos);
  }

}
