import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
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
import { Router, ParamMap, ActivatedRoute } from '@angular/router';
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
  ingAtributos: IngredienteAtributoDto[];
  usuarioLogado: UsuarioLogadoDto;
  criador: UsuarioLogadoDto;
  idParam: string;

  alergDisponiveis = [
    {id: 1, name: "Não possui"},
    {id: 2, name: "Lactose"},
    {id: 3, name: "Glúten"},
    {id: 4, name: "Amendoim"}
  ];

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
    private ingredienteService: IngredienteService,
    private route: ActivatedRoute
  ) {
    this.ingAtributos = [];
    this.fb = new FormBuilder();
    this.ingredienteForm = this.fb.group({
      nome: this.fb.control('', [Validators.required, Validators.minLength(3)]),
      origem: this.fb.control('', [Validators.required, Validators.minLength(3)]),
      tipo: [TipoIngrediente.PRIVADO, Validators.required],
      alergenico: [this.alergDisponiveis[0].name,Validators.required]
    });

    this.buscarAtributos()
    this.route.params.subscribe( params => this.idParam = params.id);

    if (this.idParam) {
      this.inicializarIngrediente();
    }
  }

  buscarAtributos() {
    this.ingAtributos = [];
     this.atributosService.buscar()
      .subscribe(a => {
        a['Atributos'].forEach(e => {
          let ingAtributosBuscados = new IngredienteAtributoDto();
          ingAtributosBuscados.atributo = e;
          ingAtributosBuscados.valor = "";
          this.ingAtributos.push(ingAtributosBuscados);
        });
      });
  }

  inicializarIngrediente() {
    this.ingredienteService.obterIngrediente(this.idParam)
      .subscribe(res => {
        this.criador = new UsuarioLogadoDto();
        this.criador.definirUsuarioLogadoDto(res.criador);
        this.ingredienteForm.controls['nome'].setValue(res.nome);
        this.ingredienteForm.controls['origem'].setValue(res.origem);
        this.ingredienteForm.controls['tipo'].setValue(res.tipo);
        this.ingredienteForm.controls['alergenico'].setValue(res.alergenico);
   
        for(let ingredienteAtributo of res.ingredienteAtributo) {
          this.ingAtributos.filter(a => a.atributo.id === ingredienteAtributo.atributo.id)[0].valor = ingredienteAtributo.valor;
        }
      });
  }

  limpar(){
    this.ingAtributos=[];
    this.ingredienteForm.controls.nome.setValue('')
    this.ingredienteForm.controls.nome.markAsPristine();
    this.ingredienteForm.controls.origem.setValue('')
    this.ingredienteForm.controls.origem.markAsPristine();
    this.ingredienteForm.controls.tipo.setValue(TipoIngrediente.PRIVADO);
    //this.ingredienteForm.controls.alergenico.setValue("Não possui")
   // this.ingredienteForm.controls.alergenico.setValue("Lactose");
    //console.log(this.ingredienteForm.controls.alergenico.get);
    this.ingredienteForm.controls.alergenico.setValue(this.alergDisponiveis[0].name);
    
    console.log(this.ingredienteForm.controls.alergenico.setValue(this.alergDisponiveis[0].name));
    //this.ingredienteForm.controls['alergenico'].setValue("Lactose");
    this.ingAtributos.forEach(a => a.valor = "");

    this.atributos.forEach(a => a.valor = 0);

    const atrs = document.getElementsByClassName("atr");
    for(let i = 0; i < atrs.length; i++) {
      atrs[i]['value'] = 0;
    }
    this.buscarAtributos();
  }



  ngOnInit() {
    
    this.usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
    if(this.usuarioLogado == null) {
      this.router.navigate(['./']);
    } else if(!this.criador) {
        this.criador = this.usuarioLogado;
    }
  }

  fieldsAreValid(): Boolean {
    var retorno: Boolean = false;
    this.ingAtributos.forEach(atr => {
      if (atr.valor === null || atr.valor === "") {
        retorno = true;
      }
    });
    console.log(this.ingredienteForm.invalid)
    console.log(retorno);
    return retorno && this.ingredienteForm.invalid;
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
    this.ingAtributos.forEach(a => {
      if(a.atributo.nome === nomeAtributo) {
        a.valor = valor;
      }
    });
  }

  definirTipoIngrediente(valor: TipoIngrediente) {
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

  salvarIngrediente() {
    if (!this.idParam) {
      this.cadastrarIngrediente(this.definirIngrediente());
    } 
    else {
      this.atualizarIngrediente(this.definirIngrediente());
    }
  }

  cadastrarIngrediente(ingrediente: Ingrediente) {
    this.ingredienteService.cadastrarIngrediente(ingrediente)
      .subscribe(resp => {
        this.toastr.success('Ingrediente cadastrado com sucesso');
        this.limpar();
      }, erro =>{
        this.toastr.error(erro.error.message);
      });
  }

  atualizarIngrediente(ingrediente: Ingrediente) {
    ingrediente.id = +this.idParam;
      this.ingredienteService.atualizarIngrediente(ingrediente)
        .subscribe(resp => {
          this.toastr.success('Ingrediente atualizado com sucesso');
          this.limpar();
        }, erro =>{
          this.toastr.error(erro.error.message);
        });
  }

  definirIngrediente(): Ingrediente {
    let ingrediente = new Ingrediente();
    ingrediente.nome = this.ingredienteForm.get('nome').value;
    ingrediente.origem = this.ingredienteForm.get('origem').value;
    ingrediente.tipo = this.ingredienteForm.get('tipo').value;
    ingrediente.alergenico= this.ingredienteForm.get('alergenico').value;
    console.log( ingrediente.alergenico );
    console.log(this.ingredienteForm.value);
    ingrediente.status = true;
    ingrediente.criador = new Usuario();
    ingrediente.criador.definirUsuario(this.criador);
    ingrediente.ingredienteAtributo = this.ingAtributos;
    return ingrediente;  }
}
