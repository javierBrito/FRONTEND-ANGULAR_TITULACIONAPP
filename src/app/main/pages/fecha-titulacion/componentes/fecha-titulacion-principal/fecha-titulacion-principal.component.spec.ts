import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FechaTitulacionPrincipalComponent } from './fecha-titulacion-principal.component';

describe('FechaTitulacionPrincipalComponent', () => {
  let component: FechaTitulacionPrincipalComponent;
  let fixture: ComponentFixture<FechaTitulacionPrincipalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FechaTitulacionPrincipalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FechaTitulacionPrincipalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
