import { Ftp } from "./ftp";
import { Ingrediente } from "../ingrediente/ingrediente";

export class ReceitaIngrediente {
    public receita: Ftp = null;
    public ingrediente: Ingrediente;
    public fatorCorrecao: number;
    public custoKg: number;
    public pesoG: number;


    public getCustoTotal(): String {
      const ct: number = (this.custoKg / 1000) * this.pesoG;
      return ct.toFixed(2);
    }
}
