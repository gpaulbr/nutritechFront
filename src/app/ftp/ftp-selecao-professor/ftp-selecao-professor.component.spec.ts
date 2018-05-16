import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FtpSelecaoProfessorComponent } from './ftp-selecao-professor.component';

describe('FtpSelecaoProfessorComponent', () => {
  let component: FtpSelecaoProfessorComponent;
  let fixture: ComponentFixture<FtpSelecaoProfessorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FtpSelecaoProfessorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FtpSelecaoProfessorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
