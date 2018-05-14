import { Usuario } from "../usuario/usuario";
import { GrupoReceita } from "../ingrediente/grupo-receita";
import { Ingrediente } from "../ingrediente/ingrediente";
import { Time } from "@angular/common";
import { FtpTipo } from "./ftp-tipo.enum";
import { ReceitaIngrediente } from "./ftp-receita-ingrediente";

export class Ftp {

    public id: Number;
    public nome: String;
    public status: Boolean;
    public publicada: Boolean;
    public passos: String[];
    public rendimento: String;
    public tempo: String;
    public peso: Number;
    public imagem: String;
    public dificuldade: Number;
    public tipo: FtpTipo;
    public criadores: Usuario[];
    //public ingredientes: Ingrediente[];
    public receitaIngrediente: ReceitaIngrediente[];
    public professor: Usuario;
    public datahora: Date;
    public grupoReceita: GrupoReceita;
}
