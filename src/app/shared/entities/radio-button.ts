export class RadioButton {

    nome: string;
    opcoes: RadioButtonElemento[] = [];

    constructor(nome: string) { }

    adicionarOpcoes(opcao: RadioButtonElemento){
        this.opcoes.push(opcao);
    }
}

export class RadioButtonElemento {
    
    constructor(
        valor: any,
        texto: string,
        selecionado: boolean = false
    ) { }
}
