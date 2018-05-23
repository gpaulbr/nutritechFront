import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { GrupoReceita } from '../../ingrediente/grupo-receita';
import { GrupoService } from '../grupo.service';
import { Router, ParamMap, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Grupo } from '../grupo';
import { Usuario } from '../../usuario/usuario';
import { TipoUsuario } from '../../usuario/tipo-usuario.enum';
import { LoginService } from '../../login/login.service';


@Component({
  selector: 'app-grupo-manutencao',
  templateUrl: './grupo-manutencao.component.html',
  styleUrls: ['./grupo-manutencao.component.css']
})
export class GrupoManutencaoComponent implements OnInit {

  grupoForm: FormGroup;
  fb: FormBuilder;
<<<<<<< HEAD
  usuarioLogado: Usuario;
  admin: Boolean = false;


=======
  id: Number;
>>>>>>> tentativa de editar - não funcionou ainda

  constructor(
    private grupoService: GrupoService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    fb: FormBuilder) {
    this.fb = new FormBuilder();
    this.grupoForm = this.fb.group({
      nome: [null, Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(50)])],
      custo: [null, Validators.compose([Validators.required, Validators.min(0), Validators.max(32768)])]      
    });

    var idGrupo
    this.route.params.subscribe( params => {
      idGrupo = params;
      this.id = idGrupo.id;
    });

    this.grupoService.obterGrupo(idGrupo.id)
      .subscribe(res => {
        this.grupoForm.controls['nome'].setValue(res.nome);
        this.grupoForm.controls['custo'].setValue(res.custo);
        this.grupoForm.controls['id'].setValue(res.id);
      });

   }

   limpar(){
    this.grupoForm;    
    this.grupoForm.controls.nome.setValue('')
    this.grupoForm.controls.nome.markAsPristine();
    this.grupoForm.controls.custo.setValue(0);
    this.grupoForm.controls.custo.markAsPristine();
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

  cadastrar () {
    
    this.grupoService.salvarGrupo(this.grupoForm.value).subscribe(
      response => {
        this.toastr.success('Grupo cadastrado com sucesso');
        this.limpar();
      },
      error => {
        this.toastr.error(error.error.message);
      });
  }

  update () {
    this.grupoForm.value.id = this.id;
    this.grupoService.editarGrupo(this.grupoForm.value).subscribe(
      response => {
        this.toastr.success('Grupo editado com sucesso');
        this.limpar();
      },
      error => {
        this.toastr.error('Erro na edição');
      });
  }

  salvar() {
    if (this.id === undefined) {
      // cadastrar
      this.cadastrar();
    } else {
      // atualizar
      this.update();
    }
    
  }
}
