import { Usuario } from "../usuario/usuario";
import { GrupoReceita } from "../ingrediente/grupo-receita";
import { Ingrediente } from "../ingrediente/ingrediente";
import { Time } from "@angular/common";

export class Ftp {

    public id: number;
    public nome: string;
    public status: boolean;
    public passos: string[];
    public rendimento: string;
    public tempo: string;
    public peso: number;
    public imagem: string;
    public tipo: number;
    public criadores: Usuario[];
    public ingredientes: Ingrediente[];
    public professor: Usuario;
    public data: Date;
    public horario: Time;
    public grupoReceita: GrupoReceita;
}
