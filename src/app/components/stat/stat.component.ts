import { Component, OnInit, inject } from '@angular/core';
import { WordsPerMinuteService } from '../../services/words-per-minute.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-stat',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './stat.component.html',
  styleUrl: './stat.component.scss',
})
export class StatComponent implements OnInit {
  protected wpmService = inject(WordsPerMinuteService);

  ngOnInit(): void {
    this.wpmService.reset();
  }
}
