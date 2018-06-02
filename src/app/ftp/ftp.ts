import { Usuario } from '../usuario/usuario';
import { GrupoReceita } from '../ingrediente/grupo-receita';
import { FtpTipo } from './ftp-tipo.enum';
import { ReceitaIngrediente } from './ftp-receita-ingrediente';
import { Imagem } from './imagem';
import { Nota } from './nota';

export class Ftp {

    public id: Number;
    public nome: String;
    public status: Boolean;
    public publicada: Boolean;
    public passos: String[];
    public rendimento: String;
    public tempo: String;
    public peso: Number;
    public imagem: Imagem;
    public dificuldade: Number;
    public tipo: FtpTipo;
    public criadores: Usuario[];
    public receitaIngrediente: ReceitaIngrediente[];
    public professor: Usuario;
    public datahora: Date;
    public grupoReceita: GrupoReceita;

    public nota: Nota;
}
