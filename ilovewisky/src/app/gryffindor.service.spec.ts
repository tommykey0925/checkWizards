import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { GryffindorService } from './gryffindor.service';

describe('GryffindorService', () => {
  let service: GryffindorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(GryffindorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
