import { Component, OnInit, ViewChild } from '@angular/core';
import { Ftp } from '../ftp';
import { FtpService } from '../ftp.service';
import { Router } from '@angular/router';
import { Usuario } from '../../usuario/usuario';
import { TipoUsuario } from '../../usuario/tipo-usuario.enum';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { ToastrService } from 'ngx-toastr';
import { Nota } from '../nota';
declare var jsPDF: any;


@Component({
  selector: 'filter-demo app-ftp-listagem',
  templateUrl: './ftp-listagem.component.html',
  styleUrls: ['./ftp-listagem.component.css']
})
export class FtpListagemComponent implements OnInit {
  public receitaRestrita: boolean;
  receitas: Ftp[]; // lista de receitas
  usuarioLogado: Usuario;
  receitaEmLista = false;
  rows = [];
  columns = [
    { name: 'Nome' },
    { name: 'Nota', prop: 'notaTxt' },
    { name: 'Rendimento' },
    { name: 'Criadores', prop: 'criadoresTxt' },
    { name: 'Grupo de Receita', prop: 'grupoReceita.nome' },
    { name: 'Tipo', prop: 'tipoTxt'},
    { name: 'Publicada', prop: 'publicadaTxt' },
    { name: 'Status', prop: 'status' },
  ];


  @ViewChild(DatatableComponent) table: DatatableComponent; // erro no import

  constructor(
    private router: Router,
    private ftpServices: FtpService,
    private toastr: ToastrService) { // variável da classe FtpService
    this.receitas = []; // inciando o array
    }

  ngOnInit() {
    this.usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
    if (this.usuarioLogado == null) {  // só libera após login
      this.router.navigate(['./']);
    }

    this.ftpServices.buscarAtivas().subscribe(receitas => {
         this.receitas = receitas['Receitas']; // acesso o que o método buscarReceita
         const lista: Ftp [] = [];
         receitas['Receitas'].forEach(p => {
          let stringCriadores: String = ''; // cria uma string vazia para concaternamos os nomes
          p['criadores'].forEach(u => {
            stringCriadores += u.nome + '<br>'; // concatena cada nome de criador de receita
          });
          p['criadoresTxt'] = stringCriadores;
          // if(p["status"]){ // para ficar mais familar para o usuário troco 'true' por 'Ativa', para a exibição
          //   p["status"] = 'Ativa';
          // }else if(!p["status"])// para ficar mais familar para o usuário troco 'false' por 'Inativa' para a exibição
          // {
          //   p["status"] = 'Inativa';
          // }

          if (p['publicada']) { // para ficar mais familar para o usuário troco 'true' por 'Ativa', para a exibição
            p['publicadaTxt'] = 'Publicada';
          } else if (!p['publicada']) {// para ficar mais familar para o usuário troco 'false' por 'Inativa' para a exibição
            p['publicadaTxt'] = 'Não Publicada';
          }

          if (p['tipo'] === 'PUBLICO') {
            p['tipoTxt'] = 'PÚBLICO'; // inclui o acento para exibir para o usuário
          } else {
            p['tipoTxt'] = 'PRIVADO'; // inclui o acento para exibir para o usuário
          }
          if (p['nota'] == null) {
            p['notaTxt'] = 'Não Avaliada';
          } else {
            p['notaTxt'] = p['nota']['nota'];
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
            });

        if (lista.length !== 0) {
          this.rows = lista;
          this.receitaEmLista = true; // para exibir mensagem se não tiver nada cadastrado
        } else {
          this.receitaEmLista = false;
        }

    });
    }

    podeDeletar(index: number): Boolean {
      if (this.receitas[index].nota != null && this.usuarioEhAluno()) {
        return false;
      }

      return true;
    }

    receitaAtiva(index: number) {
      return this.receitas[index].status;
    }

    usuarioEhAluno(): Boolean {
      if (this.usuarioLogado) {
        return this.usuarioLogado.tipo === TipoUsuario.USUARIO;
      }
      return false;
    }

    usuarioEhAdmin(): Boolean {
      if (this.usuarioLogado) {
        return this.usuarioLogado.tipo === TipoUsuario.ADMIN;
      }
      return false;
    }

    usuarioEhProfessor(): Boolean {
      if (this.usuarioLogado) {
        return this.usuarioLogado.tipo === TipoUsuario.PROFESSOR;
      }
      return false;
    }

    updateFilter(event) {
      const val = event.target.value.toLowerCase();
      // filtra por todos os campos da tabela
      const temp = this.receitas.filter(function(d) {
        if (d.nome.toLowerCase().indexOf(val) !== -1 || !val) {
              return d.nome.toLowerCase().indexOf(val) !== -1 || !val;
        }
        if (d.rendimento.toString().toLowerCase().indexOf(val) !== -1 || !val) {
          return d.rendimento.toString().toLowerCase().indexOf(val) !== -1 || !val;
        }
        if (d.criadores[0].nome.toLowerCase().indexOf(val) !== -1 || !val) {
          return d.criadores[0].nome.toLowerCase().indexOf(val) !== -1 || !val;
        }
        if (d.tipo.toString().toLowerCase().indexOf(val) !== -1 || !val) {
          return d.tipo.toString().toLowerCase().indexOf(val) !== -1 || !val;
        }
        if (d.status.toString().toLowerCase().indexOf(val) !== -1 || !val) {
          return d.status.toString().toLowerCase().indexOf(val) !== -1 || !val;
        }
        if (d.grupoReceita.nome.toLowerCase().indexOf(val) !== -1 || !val) {
          return d.grupoReceita.nome.toLowerCase().indexOf(val) !== -1 || !val;

        }

      });
        this.rows = temp; // rows é o que possibilita o filtro na tabela

      // Whenever the filter changes, always go back to the first page
      this.table.offset = 0;
    } 

  alterarReceita(index: Number) {
    this.router.navigate(['./ftp-cadastro/' + String(this.receitas[index as number].id)]);
  }

  gerarRotulo(index: Number) {
    this.router.navigate(['./rotulo/' + String(this.receitas[index as number].id)]);
  }

  gerarPDF(index: number) {
    // this.router.navigate(['./pdf/' + String(this.receitas[index as number].id)]);
    // this.toastr.warning('Ainda não implementado.');

    // Documentação: https://rawgit.com/MrRio/jsPDF/master/docs/
    
    const doc = new jsPDF({});
    let passos: String = '';
    let indice: number = 1;
    let aux: String = " ";//uso para separar os passos no pdf
    this.rows[index].passos.forEach(u => {
      passos += indice + ". " + u + aux; // concatena cada nome de criador de receita
      console.log(passos);
      indice++;
      aux = "<br>"//caso tenha mais de um passo
    });
    this.rows[index].passos = passos;
    //console.log(this.rows[index].passos);
    
    const columns = ["ID", "Name", "Country"];
    const rows = [
        [1, "Shaw", "Tanzania"],
        [2, "Nelson", "Kazakhstan"],
        [3, "Garcia", "Madagascar"]
    ]

    doc.autoTable(columns, rows);
    doc.text("Preparação: " + this.rows[index].nome, 10, 10);
    doc.text("Integrantes: " + this.rows[index]["criadoresTxt"].replace("<br>",","), 10, 20);
    doc.text("Professor: " + this.rows[index]["professor"].nome, 10, 30);
    doc.text("Grupo de alimentos: " + this.rows[index].grupoReceita.nome, 10, 40);
    doc.text("Passos: " + this.rows[index].passos.replace("<br>", " "), 10, 50);//colocar em tabela depois
    
    doc.save('a4.pdf');

   /* { name: 'Nome' },FOI
    { name: 'Nota', prop: 'notaTxt' },NÃO VAI
    { name: 'Rendimento' },
    { name: 'Criadores', prop: 'criadoresTxt' },FOI
    { name: 'Grupo de Receita', prop: 'grupoReceita.nome' },
    { name: 'Tipo', prop: 'tipoTxt'},
    { name: 'Publicada', prop: 'publicadaTxt' },
    { name: 'Status', prop: 'status' }*/
  }

  verificarAntesDeExcluir(index: number) {
    // if (this.receitas[index].nota === && this.usuarioEhAluno()) {
    //   this.toastr.error('Não é possível excluir a receita.', 'Nota já públicada');
    //   return;
    // }

    const msg = 'Clique aqui para confirmar';
    const mm = this.toastr.show(msg, null, {
      closeButton: true,
      progressBar: true,
    });
    mm.onTap.subscribe(() => this.excluirFtp(index));
  }

  ativarReceita(index: number) {
    this.toastr.warning('Não implementado');
  }

  excluirFtp(index: number) {
   const idFtp = this.receitas[index].id;
      this.ftpServices.excluirFTP(+idFtp).subscribe(
        response => {
          this.toastr.success(response['message']);
          this.receitas[index].status = false;
        },
        error => {
          console.log(error);
          this.toastr.error(error.error);
        }
      );
  }
}
