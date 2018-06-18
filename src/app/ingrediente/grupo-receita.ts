import { TipoIngrediente } from "./tipo-ingrediente.enum";
import { IngredienteAtributo } from './ingrediente-atributo';
import { Usuario } from "../usuario/usuario";

export class GrupoReceita {
    
    public nome: string;
    public custo: number;

    constructor(nome: string, custo: number) {
        this.nome = nome;
        this.custo = custo
    }
}
