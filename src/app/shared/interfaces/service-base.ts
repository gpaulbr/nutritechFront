import { Observable } from "rxjs/Observable";
import { Injectable } from "@angular/core";

export interface ServiceBase {
    url: string;
}

@Injectable()
export abstract class ServiceBase {
  
  abstract buscar(): Observable<any[]>;

  abstract excluir(id: string): Observable<any>
}