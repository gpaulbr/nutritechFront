import { TipoIngrediente } from "./tipo-ingrediente.enum";
import { IngredienteAtributo } from './ingrediente-atributo';
import { Usuario } from "../usuario/usuario";

export class GrupoReceita {
    
    public nome: string;
    public valor: number;

    constructor(nome: string, valor: number) {
        this.nome = nome;
        this.valor = valor
    }
}
