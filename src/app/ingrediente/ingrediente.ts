import { TipoIngrediente } from "./tipo-ingrediente.enum";
import { IngredienteAtributo } from './ingrediente-atributo';
import { IngredienteAtributoDto } from './ingrediente-atributo-dto';
import { Usuario } from "../usuario/usuario";
import { IngredienteDto } from "./ingrediente-dto";

export class Ingrediente {
    public id?: number
    public nome: string;
    public origem: string;
    public tipo: TipoIngrediente;
    public status: boolean;
    public criador: Usuario;
    public ingredienteAtributo: IngredienteAtributoDto[]
    public alergenico: string;

    definirIngrediente(ingrediente: IngredienteDto) {
        this.nome = ingrediente.nome;
        this.tipo = ingrediente.tipo;
        this.origem = ingrediente.origem;
    }
}


