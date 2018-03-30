import { TipoIngrediente } from "./tipo-ingrediente.enum";
import { IngredienteAtributo } from './ingrediente-atributo';

export class Ingrediente {
    
    public nome: string;
    public origem: string;
    public tipo: TipoIngrediente;
    public ingredienteAtributos: IngredienteAtributo[]
}
