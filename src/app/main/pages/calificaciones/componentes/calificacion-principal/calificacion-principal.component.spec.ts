import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalificacionPrincipalComponent } from './calificacion-principal.component';

describe('CalificacionPrincipalComponent', () => {
  let component: CalificacionPrincipalComponent;
  let fixture: ComponentFixture<CalificacionPrincipalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalificacionPrincipalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalificacionPrincipalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
