
export class IngredienteAtributoDto {

    public idAtributo: number;
    public valor: string;

    constructor(idAtr:number, val:string){
        this.idAtributo=idAtr;
        this.valor=val;
    };
}
