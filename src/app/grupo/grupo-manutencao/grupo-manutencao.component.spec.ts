import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrupoManutencaoComponent } from './grupo-manutencao.component';

describe('GrupoManutencaoComponent', () => {
  let component: GrupoManutencaoComponent;
  let fixture: ComponentFixture<GrupoManutencaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrupoManutencaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrupoManutencaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
