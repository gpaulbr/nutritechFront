import { Injectable } from '@angular/core';
import { NUTRITECH_API } from '../app.api';

@Injectable()
export class FtpService {

  private url = NUTRITECH_API + "/receitas";
  
  constructor() { }

}
