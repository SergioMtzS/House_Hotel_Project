import { TestBed } from '@angular/core/testing';

import { HabService } from './hab.service';

describe('HabService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HabService = TestBed.get(HabService);
    expect(service).toBeTruthy();
  });
});
