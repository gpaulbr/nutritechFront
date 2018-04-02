import { TipoUsuario } from "./tipo-usuario.enum";

export class Usuario {

    public id: number;
    public nome: string;
    public email: string;
    public matricula: string;
    public senha: string;
    public cpf: string;
    public status: boolean;
    public tipo: TipoUsuario;    
}
