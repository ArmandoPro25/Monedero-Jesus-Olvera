import { TestBed } from '@angular/core/testing';

import { TipoGastoServiceService } from './tipo-gasto-service.service';

describe('TipoGastoServiceService', () => {
  let service: TipoGastoServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipoGastoServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
