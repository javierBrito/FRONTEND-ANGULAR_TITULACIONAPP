import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromedioPrincipalComponent } from './promedio-principal.component';

describe('PromedioPrincipalComponent', () => {
  let component: PromedioPrincipalComponent;
  let fixture: ComponentFixture<PromedioPrincipalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PromedioPrincipalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PromedioPrincipalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
