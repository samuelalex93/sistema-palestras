import { TestBed } from '@angular/core/testing';

import { Inscricoes } from './inscricoes';

describe('Inscricoes', () => {
  let service: Inscricoes;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Inscricoes);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
