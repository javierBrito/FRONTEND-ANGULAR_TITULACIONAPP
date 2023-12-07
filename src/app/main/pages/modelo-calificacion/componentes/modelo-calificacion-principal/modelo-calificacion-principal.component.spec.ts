import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModeloCalificacionPrincipalComponent } from './modelo-calificacion-principal.component';

describe('ModeloCalificacionPrincipalComponent', () => {
  let component: ModeloCalificacionPrincipalComponent;
  let fixture: ComponentFixture<ModeloCalificacionPrincipalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModeloCalificacionPrincipalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModeloCalificacionPrincipalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
