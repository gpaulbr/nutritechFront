import { Component, OnInit } from '@angular/core';
import {NUTRITECH_API} from '../../app.api';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-ftp-image-file-upload',
  templateUrl: './ftp-image-file-upload.component.html',
  styleUrls: ['./ftp-image-file-upload.component.css']
})
export class FtpImageFileUploadComponent implements OnInit {

  url = NUTRITECH_API + '/receitas/img';
  selectedFile: File;

  constructor(private http: HttpClient) { }

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

  onUpload(): String {
    this.http.post(this.url, this.selectedFile).subscribe(response => {
      alert('Upload de imagem realizado com sucesso!');
    }, erro => {
      alert('Erro no upload da imagem!');
      return null;
    });
    return 'TO BE IMPLEMENTED';
  }
}
