import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AtributoManutencaoComponent } from './atributo-manutencao.component';

describe('AtributoManutencaoComponent', () => {
  let component: AtributoManutencaoComponent;
  let fixture: ComponentFixture<AtributoManutencaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AtributoManutencaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AtributoManutencaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
