import { Usuario } from "../usuario/usuario";
import { GrupoReceita } from "../ingrediente/grupo-receita";
import { Ingrediente } from "../ingrediente/ingrediente";
import { Time } from "@angular/common";

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
    public tipo: String;
    public criadores: Usuario[];
    public ingredientes: Ingrediente[];
    public professor: Usuario;
    public datahora: Date;
    public grupoReceita: GrupoReceita;
}
