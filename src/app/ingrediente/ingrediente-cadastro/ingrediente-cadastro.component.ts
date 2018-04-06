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

@Component({
  selector: 'app-ingrediente-cadastro',
  templateUrl: './ingrediente-cadastro.component.html',
  styleUrls: ['./ingrediente-cadastro.component.css']
})
export class IngredienteCadastroComponent implements OnInit {

  ingredienteForm: FormGroup;
  fb: FormBuilder
  atributos: IngredienteAtributo[];

  tiposIngredientes = [{
    valor: TipoIngrediente.PRIVADO,
    texto: "Privado",
    selecionado: true
  },
  {
    valor: TipoIngrediente.COMUM,
    texto: "Comum",
    selecionado: false
  }];

  constructor(private atributosService: AtributoService, private ingredienteService: IngredienteService) {
    this.atributos = [];
    this.fb = new FormBuilder();
    this.ingredienteForm = this.fb.group({
      nome: this.fb.control('', [Validators.required, Validators.minLength(3)]),
      origem: this.fb.control('', [Validators.required, Validators.minLength(3)]),
      tipo: [TipoIngrediente[TipoIngrediente.PRIVADO], Validators.required],
    });
  }

  ngOnInit() {
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

  setarValor(nomeAtributo: string, valor: number) {
    this.atributos.forEach(a => {
      if(a.atributo.nome === nomeAtributo) {
        a.valor = valor;
      }
    });
  }

  definirTipoIngrediente(valor: TipoIngrediente){
    let tipoIng = valor === TipoIngrediente.PRIVADO ? 
      TipoIngrediente[TipoIngrediente.PRIVADO] : TipoIngrediente[TipoIngrediente.COMUM];
    this.ingredienteForm.controls.tipo.setValue(tipoIng);
  }

  cadastrarIngrediente(ingrediente: IngredienteDto) {
    ingrediente.status = true;
    
    var usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
    ingrediente.idCriador = usuarioLogado.id;

    this.ingredienteService.cadastrarIngrediente(ingrediente)
      .subscribe(resp => {
        //alert(resp.message);
      }, erro =>{
        console.log(erro);
      })
  }

}