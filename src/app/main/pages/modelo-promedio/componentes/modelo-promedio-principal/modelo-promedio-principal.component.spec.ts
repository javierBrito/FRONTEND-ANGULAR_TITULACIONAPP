import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModeloPromedioPrincipalComponent } from './modelo-promedio-principal.component';

describe('ModeloPromedioPrincipalComponent', () => {
  let component: ModeloPromedioPrincipalComponent;
  let fixture: ComponentFixture<ModeloPromedioPrincipalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModeloPromedioPrincipalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModeloPromedioPrincipalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
