import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ftp-modo-preparo',
  templateUrl: './ftp-modo-preparo.component.html',
  styleUrls: ['./ftp-modo-preparo.component.css']
})
export class FtpModoPreparoComponent implements OnInit {

  constructor() { }

  novoPasso: String = '';
  passos = new Array<String>();

  ngOnInit() {
  }

  adicionarPasso() {
    this.passos.push(this.novoPasso)
    this.novoPasso = '';
  }
}
