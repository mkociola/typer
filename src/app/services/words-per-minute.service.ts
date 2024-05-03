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
  private startTime!: number;
  private words: WritableSignal<number> = signal(0);

  timer: Observable<number> = interval(1000).pipe(
    map(() => Math.round((Date.now() - this.startTime) / 1000))
  );

  wpm: Signal<number> = computed(() =>
    Math.round(this.words() / ((Date.now() - this.startTime) / (1000 * 60)))
  );

  reset(): void {
    this.startTime = Date.now();
    this.words.set(0);
  }

  addWords(words: number): void {
    this.words.update((x) => x + words);
  }
}
