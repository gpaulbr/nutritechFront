import { Component, OnInit } from '@angular/core';
import {NUTRITECH_API} from '../../app.api';
import {HttpClient} from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-ftp-image-file-upload',
  templateUrl: './ftp-image-file-upload.component.html',
  styleUrls: ['./ftp-image-file-upload.component.css']
})
export class FtpImageFileUploadComponent implements OnInit {

  url = NUTRITECH_API + '/receitas/img';
  selectedFile: File;

  constructor(
    private http: HttpClient,
    private toastr: ToastrService
    ) { }

  ngOnInit() {
  }

  onFileChanged(event) {
    this.selectedFile = event.target.files[0];
    this.previewImg(event);
  }

  previewImg(event) {
    const reader = new FileReader();
    reader.onload = function() {
      const output = document.getElementById('preview')
      output['src'] = reader.result;
    };
    reader.readAsDataURL(event.target.files[0]);
  }

  onUpload() {
    this.http.post(this.url, this.selectedFile).subscribe(response => {
      this.toastr.success('Upload de imagem realizado com sucesso!');
    }, erro => {
      this.toastr.error('Erro no upload da imagem!');
    });
  }
}
