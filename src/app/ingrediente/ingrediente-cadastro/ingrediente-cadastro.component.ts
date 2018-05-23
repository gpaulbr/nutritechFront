import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Ingrediente } from '../ingrediente';
import { TipoIngrediente } from '../tipo-ingrediente.enum';
import { AtributoService } from '../../atributo/atributo.service';
import { Atributo } from '../../atributo/atributo';
import { IngredienteAtributo } from '../ingrediente-atributo';
import { Usuario } from '../../usuario/usuario';
import { TipoUsuario } from '../../usuario/tipo-usuario.enum';
import { IngredienteService } from '../ingrediente.service';
import { IngredienteDto } from '../ingrediente-dto';
import { IngredienteAtributoDto } from '../ingrediente-atributo-dto';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { print } from 'util';
import {forEach} from '@angular/router/src/utils/collection';
import { UsuarioLogadoDto } from '../../usuario/usuario-logado-dto';


@Component({
  selector: 'app-ingrediente-cadastro',
  templateUrl: './ingrediente-cadastro.component.html',
  styleUrls: ['./ingrediente-cadastro.component.css']
})
export class IngredienteCadastroComponent implements OnInit {

  ingredienteForm: FormGroup;
  fb: FormBuilder
  atributos: IngredienteAtributo[];
  ingAtributos: IngredienteAtributoDto[];
  usuarioLogado: UsuarioLogadoDto;

  tiposIngredientes = [{
    valor: TipoIngrediente.PRIVADO,
    texto: "Privado",
    selecionado: true
  },
  {
    valor: TipoIngrediente.COMUM,
    texto: "Público",
    selecionado: false
  }];

  constructor(
    private atributosService: AtributoService,
    private router: Router,
    private toastr: ToastrService,
    private ingredienteService: IngredienteService) {
    this.atributos = [];
    this.ingAtributos = [];
    this.fb = new FormBuilder();
    this.ingredienteForm = this.fb.group({
      nome: this.fb.control('', [Validators.required, Validators.minLength(3)]),
      origem: this.fb.control('', [Validators.required, Validators.minLength(3)]),
      tipo: [TipoIngrediente.PRIVADO, Validators.required]
    });
  }

  limpar() {
    console.log('limpando');
    this.ingAtributos = [];
    this.ingredienteForm.controls.nome.setValue('')
    this.ingredienteForm.controls.nome.markAsPristine();
    this.ingredienteForm.controls.origem.setValue('')
    this.ingredienteForm.controls.origem.markAsPristine();
    this.ingredienteForm.controls.tipo.setValue(TipoIngrediente.PRIVADO)

    this.atributos.forEach(a => a.valor = 0);

    const atrs = document.getElementsByClassName("atr");
    for(let i = 0; i < atrs.length; i++) {
      atrs[i]['value'] = 0;
    }
    //window.location.reload();
  }



  ngOnInit() {

    this.usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
    if(this.usuarioLogado == null) {
      this.router.navigate(['./']);
    }
    this.atributos = [];
    console.log("atr leng",this.atributos.length);

     this.atributosService.buscarAtributos()
      .subscribe(a => {
        a['Atributos'].forEach(e => {
          let ingAtributos = new IngredienteAtributo();
          ingAtributos.atributo = e;
          ingAtributos.valor = 0;
          this.atributos.push(ingAtributos);
        });
      });
  }

  fieldsAreValid(): Boolean {
    var retorno: Boolean = false;
    this.atributos.forEach(atr => {
      if (atr.valor === null || atr.valor === 0) {
        retorno = true;
      }
    });
    console.log(this.ingredienteForm.invalid)
    console.log(retorno);
    return retorno && this.ingredienteForm.invalid;
  }

  setarValor(nomeAtributo: string, valor: string) {
    this.atributos.forEach(a => {
      if(a.atributo.nome === nomeAtributo) {
        this.ingAtributos.push(new IngredienteAtributoDto(a.atributo.id, valor));
      }
    });
  }

  definirTipoIngrediente(valor: TipoIngrediente){
    let tipoIng = valor === TipoIngrediente.PRIVADO ?
      TipoIngrediente[TipoIngrediente.PRIVADO] : TipoIngrediente[TipoIngrediente.COMUM];
    this.ingredienteForm.controls.tipo.setValue(tipoIng);
  }

  verificarSeUsuarioEhAdmin() {
    if(this.usuarioLogado) {
      return this.usuarioLogado.tipo === 'ADMIN';
    }
    return false;
  }

  cadastrarIngrediente(ingrediente: IngredienteDto) {
    //this.limpar();
    var usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
    ingrediente.status = true;
    ingrediente.idCriador = usuarioLogado.id;
    ingrediente.atributos = this.ingAtributos;

    // console.log(ingrediente);

    this.ingredienteService.cadastrarIngrediente(ingrediente)
      .subscribe(resp => {
        this.toastr.success('Ingrediente cadastrado com sucesso');
        this.limpar();
      }, erro =>{
        this.toastr.error(erro.error.message);
      });
  }

}
