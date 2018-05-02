import { TipoIngrediente } from "./tipo-ingrediente.enum";
import { IngredienteAtributo } from "./ingrediente-atributo";

export class IngredienteDto {
    public nome: string;
    public origem: string;
    public tipo: TipoIngrediente;
    public status: boolean;
    public idCriador: number;
    public atributos: IngredienteAtributo[];
}
