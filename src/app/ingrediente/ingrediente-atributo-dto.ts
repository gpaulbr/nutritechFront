

export class IngredienteAtributoDto {

    public idIngrediente: number;
    public idAtributo: number;
    public valor: string;

    constructor(idIng:number, idAtr:number, val:string){
        this.idIngrediente=idIng;
        this.idAtributo=idAtr;
        this.valor=val;
    };
}
