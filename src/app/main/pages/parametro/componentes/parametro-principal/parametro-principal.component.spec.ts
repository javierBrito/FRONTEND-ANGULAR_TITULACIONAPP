import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CargoPrincipalComponent } from './cargo-principal.component';

describe('CargoPrincipalComponent', () => {
  let component: CargoPrincipalComponent;
  let fixture: ComponentFixture<CargoPrincipalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CargoPrincipalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CargoPrincipalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
