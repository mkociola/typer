import {
  Injectable,
  OnInit,
  Signal,
  WritableSignal,
  computed,
  signal,
} from '@angular/core';
import { Observable, interval, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WordsPerMinuteService {
  private _startTime!: number;
  private _words: WritableSignal<number> = signal(0);

  timer: Observable<number> = interval(1000).pipe(
    map(() => Math.round((Date.now() - this._startTime) / 1000))
  );

  wpm: Signal<number> = computed(() =>
    Math.round(this._words() / ((Date.now() - this._startTime) / (1000 * 60)))
  );

  reset(): void {
    this._startTime = Date.now();
    this._words.set(0);
  }

  addWords(words: number): void {
    this._words.update((x) => x + words);
  }
}
