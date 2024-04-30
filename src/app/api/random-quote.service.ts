import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Quote } from '../interfaces/quote';

@Injectable({
  providedIn: 'root',
})
export class RandomQuoteService {
  private readonly _http = inject(HttpClient);
  private readonly _url = 'https://api.quotable.io';

  getRandomQuotes(quotesNumber: number = 1): Observable<Quote[]> {
    const url = `${this._url}/quotes/random?limit=${quotesNumber}`;
    return this._http.get<Quote[]>(url);
  }
}
