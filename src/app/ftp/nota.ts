import { Usuario } from "../usuario/usuario";

export class Nota {

    public id: Number;
    public nota: Number;
    public avaliador: Usuario;

    constructor(nota: Number, avaliador: Usuario) {
        this.id = null;
        this.nota = nota;
        this.avaliador = avaliador;
    }
}
