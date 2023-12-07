import { TestBed } from '@angular/core/testing';

import { ModeloCalificacionService } from './modelo-calificacion.service';

describe('ModeloCalificacionService', () => {
  let service: ModeloCalificacionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModeloCalificacionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
