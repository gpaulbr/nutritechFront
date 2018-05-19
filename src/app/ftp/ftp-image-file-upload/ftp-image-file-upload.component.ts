import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NUTRITECH_API} from '../../app.api';
import {HttpClient} from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Imagem } from '../imagem';
import {Ftp} from '../ftp';

@Component({
  selector: 'app-ftp-image-file-upload',
  templateUrl: './ftp-image-file-upload.component.html',
  styleUrls: ['./ftp-image-file-upload.component.css']
})
export class FtpImageFileUploadComponent implements OnInit {

  url = NUTRITECH_API + '/imagens';
  imagem: Imagem;

  constructor(
    private http: HttpClient,
    private toastr: ToastrService
    ) { }

  @Output()
  salvarImagem = new EventEmitter<Imagem>();
  @Input()
  obrigatorio: boolean;

  ngOnInit() {
  }

  onFileChanged(event) {
    //debugger
    this.previewImg(event);

    let img;
    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (e: any) => {
      img =  e.target.result; // data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAA8AAAAPACAIAAA...
      const tokens = img.split(','); // [data:image/png;base64] [*]
      const tokens2 = tokens[0].split(';'); // [data:image/png] [base64]
      const tokens3 = tokens2[0].split(':'); // [data] [image/png]
      const tokens4 = tokens3[1].split('/'); // [image] [png]

      this.imagem = new Imagem();
      this.imagem.ext = tokens4[1];
      this.imagem.base64 = btoa(tokens[1]); // converte para blob // para desconverter usar alob
      //console.log('Image changed');
      //console.log(this.imagem);
      this.salvar();
    };

  }

  previewImg(event) {
    const reader = new FileReader();
    reader.onload = function() {
      const output = document.getElementById('preview')
      output['src'] = reader.result;
    };
    reader.readAsDataURL(event.target.files[0]);
  }

  salvar () {
    this.salvarImagem.emit(this.imagem);
    console.log(this.imagem);
  }
}
