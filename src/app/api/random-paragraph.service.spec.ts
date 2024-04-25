import { TestBed } from '@angular/core/testing';

import { RandomParagraphService } from './random-paragraph.service';

describe('RandomParagraphService', () => {
  let service: RandomParagraphService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RandomParagraphService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
