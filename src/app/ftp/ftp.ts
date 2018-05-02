import { Usuario } from "../usuario/usuario";
import { GrupoReceita } from "../ingrediente/grupo-receita";
import { Ingrediente } from "../ingrediente/ingrediente";
import { Time } from "@angular/common";

export class Ftp {

    public id: Number;
    public nome: String;
    public status: Boolean;
    public passos: String[];
    public rendimento: String;
    public tempo: String;
    public peso: Number;
    public imagem: String;
    public tipo: Number;
    public criadores: Usuario[];
    public ingredientes: Ingrediente[];
    public professor: Usuario;
    public data: Date;
    public dificuldade: Number;
    public grupoReceita: GrupoReceita;
}
