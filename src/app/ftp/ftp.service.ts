import { Injectable } from '@angular/core'; //import padrão do angular
import { HttpClient } from '@angular/common/http'; //import padrão do angular
import { Ftp } from './ftp'; //import da classe Ftp
import { NUTRITECH_API } from '../app.api'; //import da API
import { Observable } from 'rxjs/Observable'; //import usado para buscar no BD

@Injectable()
export class FtpService {
  private url = NUTRITECH_API + "/receitas";
  constructor(private http: HttpClient) { } 

  salvarFTP(ftp: Ftp): Observable<Ftp>{
    return this.http.post<Ftp>(this.url, ftp);
  }

  buscarFTP(): Observable<Ftp[]>{ //o ftp referencia a classe que estou usando para buscar
     return this.http.get<Ftp[]>(this.url);
    //já tem a função de pegar a recita por id na API, a questão é: como usar?
  }
}
