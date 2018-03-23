import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-radio-button',
  templateUrl: './radio-button.component.html'
})
export class RadioButtonComponent {

  @Input()
  opcoes = [];

  @Input()
  nome: string = '';

  @Output()
  emissaoValor = new EventEmitter<{valor: any}>();

  emitirValor(valor: any){
    this.emissaoValor.emit(valor);
  }

}
