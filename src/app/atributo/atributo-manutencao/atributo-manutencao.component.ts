import { Component, OnInit } from '@angular/core';
import { AtributoService } from '../atributo.service';
import { Usuario } from '../../usuario/usuario';
import { TipoUsuario } from '../../usuario/tipo-usuario.enum';
import { LoginService } from '../../login/login.service';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UsuarioLogadoDto } from '../../usuario/usuario-logado-dto';

@Component({
  selector: 'app-atributo-manutencao',
  templateUrl: './atributo-manutencao.component.html',
  styleUrls: ['./atributo-manutencao.component.css']
})
 export class AtributoManutencaoComponent implements OnInit {

  atributoForm: FormGroup;
  usuarioLogado: UsuarioLogadoDto;
  admin: Boolean = false;

  obrigatorio = [{
    valor: true,
    texto: "Sim",
    selecionado: true
  },
  {
    valor: false,
    texto: "Não",
    selecionado: false
  }];

  constructor(
    private atributoService: AtributoService,
    private router: Router,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    fb: FormBuilder) { 
      this.atributoForm = fb.group({
        nome: [null, Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(50)])],
        ordem: [null, Validators.compose([Validators.required, Validators.maxLength(50)])],
        multiplicador: [null, Validators.compose([Validators.required,Validators.min(1)])],
        unidade: [null, Validators.compose([Validators.required, Validators.maxLength(20)])],
        valorDiario: [null],
        obrigatorio: [true, Validators.compose([Validators.required])],
        id: [null]
      });

      //this.buscarAtributos()
      let idAtributo;
      this.route.params.subscribe( params => idAtributo = params.id);
  
      if (idAtributo != null) {
        this.atributoService.obterAtributo(idAtributo).subscribe(response => {
          this.atributoForm.controls['id'].setValue(response.id);
          this.atributoForm.controls['nome'].setValue(response.nome);
          this.atributoForm.controls['ordem'].setValue(response.ordem);
          this.atributoForm.controls['multiplicador'].setValue(response.multiplicador),
          this.atributoForm.controls['unidade'].setValue(response.unidade),
          this.atributoForm.controls['obrigatorio'].setValue(response.obrigatorio);   
          this.atributoForm.controls['valorDiario'].setValue(response.valorDiario);     
        });
      }
    }

    limpar(){
      this.atributoForm;    
      this.atributoForm.setValue(null)
      this.atributoForm.markAsPristine();
    }   

  ngOnInit() {
    var usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
    if(usuarioLogado == null) {  
      this.router.navigate(['./']);
    } else {
      if(usuarioLogado.tipo === TipoUsuario.ADMIN){ 
        this.admin = true;
      } else{
        this.router.navigate(['./']); 
        this.toastr.warning("Você não tem permissão!") /* após o ajuste do header verificar essa ação */
      }    
    }
  }

  definirObrigatorio(valor: number){
    this.atributoForm.controls.obrigatorio.setValue(valor);
  }

  cadastrar(){
    this.atributoService.salvarAtributo(this.atributoForm.value).subscribe(
      response => {
        this.toastr.success('Atributo cadastrado com sucesso');
        this.limpar();
        this.router.navigate(['./atributo-listagem']);
      },
      error => {
        this.toastr.error(error.error.message);
      });
  }
  update () {
    this.atributoService.editarAtributo(this.atributoForm.value).subscribe(
      response => {
        this.toastr.success('Atributo editado com sucesso');
        this.limpar();
        this.router.navigate(['./atributo-listagem']);
      },
      error => {
        this.toastr.error('Erro na edição');
      });
  }

  salvar() {
    if (this.atributoForm.value.id != null) {
      this.update();      
    } else {
      this.cadastrar();
    }
    
  }


}
