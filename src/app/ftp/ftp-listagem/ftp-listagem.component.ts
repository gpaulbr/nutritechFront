import { Component, OnInit, ViewChild } from '@angular/core';
import { Ftp } from '../ftp';
import { FtpService } from '../ftp.service';
import { Router } from '@angular/router';
import { Usuario } from '../../usuario/usuario';
import { TipoUsuario } from '../../usuario/tipo-usuario.enum';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { DatatableComponent } from '@swimlane/ngx-datatable';


@Component({
  selector: 'filter-demo app-ftp-listagem',
  templateUrl: './ftp-listagem.component.html',
  styleUrls: ['./ftp-listagem.component.css']
})
export class FtpListagemComponent implements OnInit {
  public receitaRestrita:boolean;
  receitas: Ftp[]; // lista de receitas
  usuarioLogado: Usuario;
  receitaEmLista:boolean = false;
  rows = [];
  columns = [ ];

  @ViewChild(DatatableComponent) table: DatatableComponent; // erro no import

  constructor(private router: Router, private ftpServices: FtpService) { // variável da classe FtpService
    this.receitas = []; // inciando o array

    }

  ngOnInit() {
    this.usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
    if(this.usuarioLogado == null) {  // só libera após login
      this.router.navigate(['./']);
    }

    this.ftpServices.buscarFTP().subscribe(receitas =>{
         this.receitas = receitas["Receitas"]; // acesso o que o método buscarReceita
         var lista:Ftp [] = [];
         receitas['Receitas'].forEach(p => {
          let stringCriadores: String = ""; // cria uma string vazia para concaternamos os nomes
          p['criadores'].forEach(u => {
            stringCriadores += u.nome + "<br>"; // concatena cada nome de criador de receita
          });
          p['criador'] = stringCriadores;
          if(p["status"]){ // para ficar mais familar para o usuário troco 'true' por 'Ativa', para a exibição
            p["status"] = 'Ativa';
          }else if(!p["status"])// para ficar mais familar para o usuário troco 'false' por 'Inativa' para a exibição
          {
            p["status"] = 'Inativa';
          }
          if(p["tipo"]=="PUBLICO"){
            p["tipo"] = "PÚBLICO"; // inclui o acento para exibir para o usuário
          }

          /* Comentado pq não tenho certeza se isso foi denifido nessa sprint if(this.usuarioLogado.tipo!='ADMIN' &&
           this.usuarioLogado.tipo!='PROFESSOR'){
            if(this.usuarioLogado.id==p.criadores[0].id){
              lista.push(p);//inlcui na lista, por enquanto, só as cadastradas pelo próprio usuário comum
            }
          }else{
            lista.push(p);//se for ADMIN ou PROFESSOR, tem acesso a todas as FTPs
          } */
          lista.push(p); // inlcui na lista
            })
        if (lista.length != 0){
          this.rows = lista;
          this.receitaEmLista = true; // para exibir mensagem se não tiver nda cadastrado
        }
        else
          this.receitaEmLista = false;
    });
    }

        updateFilter(event) {
          const val = event.target.value.toLowerCase();
          let i = 0;
          // filtra por todos os campos da tabela
          const temp = this.receitas.filter(function(d) {
            if(d.nome.toLowerCase().indexOf(val) !== -1 || !val)
                  return d.nome.toLowerCase().indexOf(val) !== -1 || !val;
            if(d.rendimento.toString().toLowerCase().indexOf(val) !== -1 || !val)
                  return d.rendimento.toString().toLowerCase().indexOf(val) !== -1 || !val;
            if(d.criadores[0].nome.toLowerCase().indexOf(val) !== -1 || !val) // quando tiver mais de um criador tem que percorrer os criadores e pesquisar
                return d.criadores[0].nome.toLowerCase().indexOf(val) !== -1 || !val;
            if(d.tipo.toString().toLowerCase().indexOf(val) !== -1 || !val)
                  return d.tipo.toString().toLowerCase().indexOf(val) !== -1 || !val;
            if(d.status.toString().toLowerCase().indexOf(val) !== -1 || !val)
                  return d.status.toString().toLowerCase().indexOf(val) !== -1 || !val;
            if(d.grupoReceita.nome.toLowerCase().indexOf(val) !== -1 || !val)
                  return d.grupoReceita.nome.toLowerCase().indexOf(val) !== -1 || !val;

          });
            this.rows = temp; // rows é o que possibilita o filtro na tabela

          // Whenever the filter changes, always go back to the first page
          this.table.offset = 0;
        }
  redicionarAlterar(index: Number) {
    this.router.navigate(['./ftp-cadastro/' + String(this.receitas[index as number].id)]);
  }


}
