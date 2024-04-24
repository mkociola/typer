import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Quote } from '../interfaces/quote';

@Injectable({
  providedIn: 'root',
})
export class RandomQuotesService {
  private readonly _http = inject(HttpClient);
  private readonly _url = 'https://zenquotes.io/api';

  getRandomQuotes(): Observable<Quote[]> {
    const url = `${this._url}/quotes`;
    return this._http.get<Quote[]>(url);
  }
}
