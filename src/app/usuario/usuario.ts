import { TipoUsuario } from "./tipo-usuario.enum";
import { UsuarioLogadoDto } from "./usuario-logado-dto";

export class Usuario {

    public id: number;
    public nome: string;
    public email: string;
    public matricula: string;
    public senha: string;
    public cpf: string;
    public status: boolean;
    public tipo: TipoUsuario; 
    
    
    public definirUsuario(usuarioLogado: UsuarioLogadoDto) {
        this.id = usuarioLogado.id;
        this.nome = usuarioLogado.nome;
    }
}
