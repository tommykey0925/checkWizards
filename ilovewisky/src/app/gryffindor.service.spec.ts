import { TestBed } from '@angular/core/testing';

import { GryffindorService } from './gryffindor.service';

describe('GryffindorService', () => {
  let service: GryffindorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GryffindorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
