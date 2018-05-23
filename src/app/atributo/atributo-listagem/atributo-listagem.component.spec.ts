import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AtributoListagemComponent } from './atributo-listagem.component';

describe('AtributoManutencaoComponent', () => {
  let component: AtributoListagemComponent;
  let fixture: ComponentFixture<AtributoListagemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AtributoListagemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AtributoListagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
