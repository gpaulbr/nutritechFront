import { Usuario } from "../usuario/usuario";

export class Ftp {
    public id: number;
    public imagem: string;
    public nome: string;
    public rendimento: number;
    public status: boolean;
    public tempo: string;
    public tipo: number;
    public grupoRceita: number;
    public usuario: Usuario; 
}

