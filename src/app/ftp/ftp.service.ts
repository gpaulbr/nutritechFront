import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { NUTRITECH_API } from '../app.api';
import { Ftp } from './ftp';

@Injectable()
export class FtpService {

  private url = NUTRITECH_API + "/receitas";
  
  constructor(private http: HttpClient) { }

  salvarFTP(ftp: Ftp): Observable<Ftp>{
    return this.http.post<Ftp>(this.url, ftp);
  }

  buscarFTP(): Observable<Ftp[]>{
    return this.http.get<Ftp[]>(this.url);
  }

}
