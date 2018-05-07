import { Usuario } from "../usuario/usuario";
import { GrupoReceita } from "../ingrediente/grupo-receita";


export class Ftp {
    public id: number;
    public imagem: string;
    public nome: string;
    public rendimento: number;
    public status: boolean;
    public tempo: string;
    public tipo: string;
    public criadores: Usuario[]; 
    public grupoReceita: GrupoReceita;
}



