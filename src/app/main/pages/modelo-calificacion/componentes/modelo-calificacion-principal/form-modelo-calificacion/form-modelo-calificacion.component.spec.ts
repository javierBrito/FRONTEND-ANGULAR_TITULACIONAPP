import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormModeloCalificacionComponent } from './form-modelo-calificacion.component';

describe('FormModeloCalificacionComponent', () => {
  let component: FormModeloCalificacionComponent;
  let fixture: ComponentFixture<FormModeloCalificacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormModeloCalificacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormModeloCalificacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
