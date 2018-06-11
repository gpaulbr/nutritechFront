import { TipoIngrediente } from "./tipo-ingrediente.enum";
import { IngredienteAtributoDto } from "./ingrediente-atributo-dto";

export class IngredienteDto {
    public nome: string;
    public origem: string;
    public tipo: TipoIngrediente;
    public status: boolean;
    public idCriador: number;
    public atributos: IngredienteAtributoDto[];
    public alergenico: string;
}
