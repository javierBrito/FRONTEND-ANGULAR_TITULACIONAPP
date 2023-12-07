import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormModeloPromedioComponent } from './form-modelo-promedio.component';

describe('FormModeloPromedioComponent', () => {
  let component: FormModeloPromedioComponent;
  let fixture: ComponentFixture<FormModeloPromedioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormModeloPromedioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormModeloPromedioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
