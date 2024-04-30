import { TestBed } from '@angular/core/testing';

import { RandomQuoteService } from './random-quote.service';

describe('RandomParagraphService', () => {
  let service: RandomQuoteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RandomQuoteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
