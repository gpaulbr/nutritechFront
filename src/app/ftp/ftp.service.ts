import { Injectable } from '@angular/core';
import { NUTRITECH_API } from '../app.api';
import { HttpClient } from '@angular/common/http';
import { Ftp } from './ftp';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class FtpService {

  private url = NUTRITECH_API + "/receitas";

  constructor(private http: HttpClient) { }

  salvarFTP(ftp: Ftp): Observable<Ftp> {
    return this.http.post<Ftp>(this.url, ftp);
  }

  atualizarFTP(ftp: Ftp): Observable<Ftp> {
    return this.http.put<Ftp>(this.url + '/update', ftp);
  }

  buscarFTP(): Observable<Ftp[]>{
    return this.http.get<Ftp[]>(this.url);
  }

  buscarAtivas(): Observable<Ftp[]>{
    return this.http.get<Ftp[]>(this.url);//+ '/ativas'
  }

  obterFTP(id: string): Observable<Ftp>{
    return this.http.get<Ftp>(`${NUTRITECH_API}/receitas/${id}/`);
  }

  excluirFTP(id: number): Observable<Ftp>{
    return this.http.delete<Ftp>(`${NUTRITECH_API}/receitas/${id}`)
  }

  getDateTimeNow(): Observable<Date> {
    return this.http.get<Date>(this.url + '/now');
  }

}
