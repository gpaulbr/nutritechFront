import { Component, OnInit } from '@angular/core';
import { Ftp } from '../ftp';
import { FtpService } from '../ftp.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ftp-listagem',
  templateUrl: './ftp-listagem.component.html',
  styleUrls: ['./ftp-listagem.component.css']
})
export class FtpListagemComponent implements OnInit {

  receitas: Ftp[]; //lista de receitas
  public receitaRestrita:boolean;

  constructor(private router: Router, 
    private ftpServices: FtpService) { //variável da classe FtpService
    this.receitas = [];//inciando o array
  }

  ngOnInit() {
    var usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));

    if(usuarioLogado == null) {  //só libera após login
      this.router.navigate(['./']);
    }  

    this.ftpServices.buscarFTP()
      .subscribe(receitas => this.receitas = receitas["Receitas"])//acesso o que o método buscarReceita pegou pel
  }

  teste(){
    console.log(this.receitas) //retirar depois de testar
  }
}