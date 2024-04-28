import {
  AfterViewInit,
  Component,
  ElementRef,
  ViewChild,
  inject,
} from '@angular/core';
import { RandomParagraphService } from '../../api/random-paragraph.service';
import { NgClass } from '@angular/common';
import { WordsPerMinuteService } from '../../services/words-per-minute.service';

@Component({
  selector: 'app-typer',
  standalone: true,
  imports: [NgClass],
  templateUrl: './typer.component.html',
  styleUrl: './typer.component.scss',
})
export class TyperComponent implements AfterViewInit {
  private _randomParagraphService = inject(RandomParagraphService);
  private _wpmService = inject(WordsPerMinuteService);
  protected sentence!: string;
  protected lastCorrectCharacterIndex: number = 0;

  @ViewChild('input') private _input!: ElementRef;

  ngAfterViewInit(): void {
    this.fetchSentence();
    this._input.nativeElement.focus();
  }

  protected onInputChange(input: string): void {
    // iterate to find lastCorrectCharacterIndex
    for (let i = 0; i < this.sentence.length; i++) {
      if (this.sentence.charAt(i) === input.charAt(i)) {
        this.lastCorrectCharacterIndex = i + 1;
      } else {
        this.lastCorrectCharacterIndex = i;
        return;
      }
    }

    // check for completion
    if (this.sentence === input) {
      this.handleWin();
    }
  }

  private handleWin(): void {
    // add finished words to the
    // WordsPerMinute service
    let wordsNum = this.sentence.split(' ').length;
    this._wpmService.addWords(wordsNum);

    // reset values
    this._input.nativeElement.value = '';
    this.lastCorrectCharacterIndex = 0;
    this.fetchSentence();
  }

  private fetchSentence(): void {
    // reddit says that Observables returned by the
    // HttpClient are automatically unsubscribed
    this._randomParagraphService
      .getRandomSentences()
      .subscribe((data) => (this.sentence = data));
  }
}
