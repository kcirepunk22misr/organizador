import { TestBed } from '@angular/core/testing';

import { HerramientasService } from './herramientas.service';

describe('HerramientasService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HerramientasService = TestBed.get(HerramientasService);
    expect(service).toBeTruthy();
  });
});
