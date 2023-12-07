import { TestBed } from '@angular/core/testing';

import { ConsejoEjecutivoService } from './consejo-ejecutivo.service';

describe('ConsejoEjecutivoService', () => {
  let service: ConsejoEjecutivoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConsejoEjecutivoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
