import { TestBed } from '@angular/core/testing';

import { ModeloPromedioService } from './modelo-promedio.service';

describe('ModeloPromedioService', () => {
  let service: ModeloPromedioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModeloPromedioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
