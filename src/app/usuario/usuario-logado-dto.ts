import { Usuario } from "./usuario";

export class UsuarioLogadoDto {

    public id: number;
    public nome: string;
    public tipo: string;

    public definirUsuarioLogadoDto(usuario: Usuario) {
        this.id = usuario.id;
        this.nome = usuario.nome;
    }
}
