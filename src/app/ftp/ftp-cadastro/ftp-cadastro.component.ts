import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ftp-cadastro',
  templateUrl: './ftp-cadastro.component.html',
  styleUrls: ['./ftp-cadastro.component.css']
})
export class FTPCadastroComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    var usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
    if(usuarioLogado == null) {  
      this.router.navigate(['./']);
    }
  }

}
