import { Ftp } from "./ftp";
import { Ingrediente } from "../ingrediente/ingrediente";

export class ReceitaIngrediente {
    public receita: Ftp = null;
    public ingrediente: Ingrediente;
    public custoKg : Number;
    public pesoG : Number;
}
