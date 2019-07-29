import { TestBed } from '@angular/core/testing';

import { CommfunService } from './commfun.service';

describe('CommfunService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CommfunService = TestBed.get(CommfunService);
    expect(service).toBeTruthy();
  });
});
