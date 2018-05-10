import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TipoUsuario } from '../usuario/tipo-usuario.enum';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  fb: FormBuilder;

  constructor(private loginService: LoginService,
    private router: Router,
    fb: FormBuilder) {
      this.fb = new FormBuilder();
      this.loginForm = this.fb.group({
      email: [null, Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(50)])],
      senha: [null, Validators.compose([Validators.required, Validators.min(0), Validators.max(32768)])]      
    });
    }

  ngOnInit() {
  }

  logar(){
    this.loginService.efetuarLogin(this.loginForm.value).subscribe(
      response => {
        localStorage.setItem('usuarioLogado',JSON.stringify(
           { id: response.id, nome: response.nome, tipo: response.tipo }
          )
        );        
        this.router.navigate(['./ftp-listagem']);

      },
      error => {
        console.log(error)
        alert(error.error);
      });;
  }

}
