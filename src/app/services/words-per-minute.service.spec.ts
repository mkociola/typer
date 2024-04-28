import { TestBed } from '@angular/core/testing';

import { WordsPerMinuteService } from './words-per-minute.service';

describe('WordsPerMinuteService', () => {
  let service: WordsPerMinuteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WordsPerMinuteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
