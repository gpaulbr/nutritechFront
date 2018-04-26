import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrupoListagemComponent } from './grupo-listagem.component';

describe('GrupoManutencaoComponent', () => {
  let component: GrupoListagemComponent;
  let fixture: ComponentFixture<GrupoListagemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrupoListagemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrupoListagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
