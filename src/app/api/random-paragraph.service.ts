import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RandomParagraphService {
  private readonly _http = inject(HttpClient);
  private readonly _url = 'http://metaphorpsum.com';

  getRandomParagraphs(numberOfParagraphs: number = 5): Observable<string> {
    const url = `${this._url}/paragraphs/${numberOfParagraphs}`;
    return this._http.get(url, { responseType: 'text' });
  }

  getRandomSentences(numberOfSentences: number = 1): Observable<string> {
    const url = `${this._url}/sentences/${numberOfSentences}`;
    return this._http.get(url, { responseType: 'text' });
  }
}
