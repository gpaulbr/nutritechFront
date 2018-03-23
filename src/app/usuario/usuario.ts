import { TipoUsuario } from "./tipo-usuario.enum";

export class Usuario {

    public nome: string;
    public email: string;
    public matricula: string;
    public senha: string;
    public cpf: string;
    public tipoUsuario: TipoUsuario;
    public ativo: boolean;
    
}
