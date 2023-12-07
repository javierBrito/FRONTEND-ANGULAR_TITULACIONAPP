import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormFechaTitulacionComponent } from './form-fecha-titulacion.component';

describe('FormFechaTitulacionComponent', () => {
  let component: FormFechaTitulacionComponent;
  let fixture: ComponentFixture<FormFechaTitulacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormFechaTitulacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormFechaTitulacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
