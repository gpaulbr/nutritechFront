import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-ftp-dificuldade',
  templateUrl: './ftp-dificuldade.component.html',
  styleUrls: ['./ftp-dificuldade.component.css']
})
export class FtpDificuldadeComponent implements OnInit {

  @Input()
  dificuldadeMaxima: number

  @Input()
  dificuldade: number;

  @Input()
  podeAlterar: boolean;

  @Output()
  salvarDificuldade = new EventEmitter<{dificuldade: number}>();

  constructor() { }

  ngOnInit() {
  }

  alterarDificuldade(dificuldade: any){
    if (this.podeAlterar) {
      this.dificuldade = dificuldade;
      this.salvarDificuldade.emit(dificuldade);
    }
  }

}
