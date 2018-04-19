import { Component, OnInit } from '@angular/core';
import { Ftp } from '../ftp';
import { FtpService } from '../ftp.service';

@Component({
  selector: 'app-ftp-listagem',
  templateUrl: './ftp-listagem.component.html',
  styleUrls: ['./ftp-listagem.component.css']
})
export class FtpListagemComponent implements OnInit {

  receitas: Ftp[]; //lista de receitas

  constructor(private ftpServices: FtpService) { //variável da classe FtpService
    this.receitas = [];//inciando o array
  }

  ngOnInit() {
    this.ftpServices.buscarReceita()
      .subscribe(receitas => this.receitas = receitas["Receitas"])//acesso o que o método buscarReceita pegou pel
  }

  teste(){
    console.log(this.receitas) //retirar depois de testar
  }

}
