import { Injectable } from '@angular/core'; //import padrão do angular
import { HttpClient } from '@angular/common/http'; //import padrão do angular
import { Ftp } from './ftp'; //import da classe Ftp
import { NUTRITECH_API } from '../app.api'; //import da API
import { Observable } from 'rxjs/Observable'; //import usado para buscar no BD

@Injectable()
export class FtpService {

  constructor(private http: HttpClient) { } 

  buscarReceita(): Observable<Ftp[]>{ //o ftp referencia a classe que estou usando para buscar
    return this.http.get<Ftp[]>(NUTRITECH_API + '/receitas');
  }

}
