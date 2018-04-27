import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-ftp-modo-preparo',
  templateUrl: './ftp-modo-preparo.component.html',
  styleUrls: ['./ftp-modo-preparo.component.css']
})
export class FtpModoPreparoComponent implements OnInit {

  constructor() { }

  novoPasso: String = '';
  passos = new Array<String>();
  
  @Output()
  salvarPassos = new EventEmitter<Array<String>>();

  ngOnInit() {
  }

  adicionarPasso() {
    this.passos.push(this.novoPasso)
    this.novoPasso = '';
    this.salvar();
  }

  atualizarPassos(passo: string, index: number){
    this.passos[index] = passo;
    this.salvar();
  }

  salvar() {
    this.salvarPassos.emit(this.passos);
  }

}
