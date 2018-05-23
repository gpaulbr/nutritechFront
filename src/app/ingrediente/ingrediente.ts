import { TipoIngrediente } from "./tipo-ingrediente.enum";
import { IngredienteAtributo } from './ingrediente-atributo';
import { IngredienteAtributoDto } from './ingrediente-atributo-dto';
import { Usuario } from "../usuario/usuario";

export class Ingrediente {
    
    public nome: string;
    public origem: string;
    public tipo: TipoIngrediente;
    public status: boolean;
    public criador: Usuario;
    public ingredienteAtributo: IngredienteAtributoDto[]
}
