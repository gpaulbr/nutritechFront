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
import { print } from 'util';

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

  limpar(){
    this.ingAtributos=[];    
    this.ingredienteForm.controls.nome.setValue('')
    this.ingredienteForm.controls.origem.setValue('')
    this.ingredienteForm.controls.tipo.setValue(TipoIngrediente.PRIVADO)

    const atrs = document.getElementsByClassName("atr");
    for(let i = 0; i < atrs.length; i++) {
      atrs[i]['value'] =0;
      
    }
  }

  ngOnInit() {
    let usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
    if(usuarioLogado == null) {  
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

  cadastrarIngrediente(ingrediente: IngredienteDto) {
    this.limpar();
    ingrediente.status = true;
    ingrediente.idCriador = 1;
    ingrediente.atributos = this.ingAtributos;
    
    this.ingredienteService.cadastrarIngrediente(ingrediente)
      .subscribe(resp => {
        alert("Ingrediente cadastrado com sucesso!");
      }, erro =>{
        alert("Erro no cadastro!");
      })
  }

}