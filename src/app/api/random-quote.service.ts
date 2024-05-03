import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Quote } from '../interfaces/quote';

@Injectable({
  providedIn: 'root',
})
export class RandomQuoteService {
  private readonly http = inject(HttpClient);
  private readonly url = 'https://api.quotable.io';

  getRandomQuotes(quotesNumber: number = 1): Observable<Quote[]> {
    const url = `${this.url}/quotes/random?limit=${quotesNumber}`;
    return this.http.get<Quote[]>(url);
  }
}
