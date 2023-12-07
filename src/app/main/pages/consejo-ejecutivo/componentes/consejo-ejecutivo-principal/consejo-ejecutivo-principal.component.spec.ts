import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsejoEjecutivoPrincipalComponent } from './consejo-ejecutivo-principal.component';

describe('ConsejoEjecutivoPrincipalComponent', () => {
  let component: ConsejoEjecutivoPrincipalComponent;
  let fixture: ComponentFixture<ConsejoEjecutivoPrincipalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsejoEjecutivoPrincipalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsejoEjecutivoPrincipalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
