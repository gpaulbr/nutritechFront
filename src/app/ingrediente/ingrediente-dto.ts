import { TipoIngrediente } from "./tipo-ingrediente.enum";

export class IngredienteDto {
    public nome: string;
    public origem: string;
    public tipo: TipoIngrediente;
    public status: boolean;
    public idCriador: number;
}
