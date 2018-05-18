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
  selectedFile: ImageData;

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
    this.selectedFile = event.target.files[0];
    this.previewImg(event);
    this.imagem = new Imagem();
    this.imagem.imagem = new Blob([this.selectedFile], {type: 'images/*'});
    console.log('Image changed');
    this.salvar();
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
    this.http.post<Imagem>(this.url, this.imagem).subscribe(resp => {
      this.toastr.success('Ha!');
    }, error =>{
      this.toastr.error(error.error);
    });
    console.log(this.imagem);
  }
}
