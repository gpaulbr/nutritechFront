import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

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
  @Input()
  obrigatorio: boolean

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
