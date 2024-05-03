import {
  AfterViewInit,
  Component,
  ElementRef,
  ViewChild,
  inject,
} from '@angular/core';
import { RandomQuoteService } from '../../api/random-quote.service';
import { NgClass } from '@angular/common';
import { WordsPerMinuteService } from '../../services/words-per-minute.service';
import { Quote } from '../../interfaces/quote';
import { ColorByIndexPipe } from '../../pipes/color-by-index.pipe';

@Component({
  selector: 'app-typer',
  standalone: true,
  imports: [NgClass, ColorByIndexPipe],
  templateUrl: './typer.component.html',
  styleUrl: './typer.component.scss',
})
export class TyperComponent implements AfterViewInit {
  private _randomTextService = inject(RandomQuoteService);
  private _wpmService = inject(WordsPerMinuteService);
  protected quote!: Quote;
  protected lastCorrectCharacterIndex: number = 0;
  protected loading: boolean = true;

  @ViewChild('input') private _input!: ElementRef;

  ngAfterViewInit(): void {
    this.fetchSentence();
    this._input.nativeElement.focus();
    this._wpmService.reset();
  }

  protected onInputChange(input: string): void {
    // iterate to find lastCorrectCharacterIndex
    for (let i = 0; i < this.quote.content.length; i++) {
      if (this.quote.content.charAt(i) === input.charAt(i)) {
        this.lastCorrectCharacterIndex = i + 1;
      } else {
        this.lastCorrectCharacterIndex = i;
        return;
      }
    }

    // check for completion
    if (this.quote.content === input) {
      this.handleWin();
    }
  }

  private handleWin(): void {
    // add finished words to the
    // WordsPerMinute service
    let wordsNum = this.quote.content.split(' ').length;
    this._wpmService.addWords(wordsNum);

    // reset values
    this._input.nativeElement.value = '';
    this.lastCorrectCharacterIndex = 0;
    this.fetchSentence();
  }

  private fetchSentence(): void {
    // reddit says that Observables returned by the
    // HttpClient are automatically unsubscribed
    this.loading = true;
    this._randomTextService.getRandomQuotes().subscribe({
      next: (data) => {
        this.quote = data[0];
        this.loading = false;
      },
      error: (e) => {
        alert(
          'There was an error while fetching sentences. See the console for more information'
        );
      },
    });
  }
}
