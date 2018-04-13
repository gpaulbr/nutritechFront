import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  estaLogado(){
    return JSON.parse(localStorage.getItem('usuarioLogado')) != null;
  }

  logout(){
    localStorage.clear();
    this.router.navigate(['./']);
  }
}
