import { TestBed } from '@angular/core/testing';

import { RegistroGastoService } from './registro-gasto.service';

describe('RegistroGastoService', () => {
  let service: RegistroGastoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegistroGastoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
