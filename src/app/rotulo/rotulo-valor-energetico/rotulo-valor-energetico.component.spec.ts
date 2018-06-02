import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RotuloValorEnergeticoComponent } from './rotulo-valor-energetico.component';

describe('RotuloValorEnergeticoComponent', () => {
  let component: RotuloValorEnergeticoComponent;
  let fixture: ComponentFixture<RotuloValorEnergeticoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RotuloValorEnergeticoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RotuloValorEnergeticoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
