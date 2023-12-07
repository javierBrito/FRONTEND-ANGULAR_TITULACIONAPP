import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormConsejoEjecutivoComponent } from './form-consejo-ejecutivo.component';

describe('FormConsejoEjecutivoComponent', () => {
  let component: FormConsejoEjecutivoComponent;
  let fixture: ComponentFixture<FormConsejoEjecutivoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormConsejoEjecutivoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormConsejoEjecutivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
