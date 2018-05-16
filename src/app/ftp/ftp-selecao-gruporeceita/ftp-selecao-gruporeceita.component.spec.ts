import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FtpSelecaoGruporeceitaComponent } from './ftp-selecao-gruporeceita.component';

describe('FtpSelecaoGruporeceitaComponent', () => {
  let component: FtpSelecaoGruporeceitaComponent;
  let fixture: ComponentFixture<FtpSelecaoGruporeceitaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FtpSelecaoGruporeceitaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FtpSelecaoGruporeceitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
