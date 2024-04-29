import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TyperComponent } from './components/typer/typer.component';
import { StatComponent } from './components/stat/stat.component';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Game } from './interfaces/game';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TyperComponent, StatComponent, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  protected game: Game = { isStarted: false, mode: undefined };
  protected gameModes = ['Free'];
  protected startGameForm = new FormGroup({
    mode: new FormControl('', Validators.required),
  });

  protected handleStartGame(): void {
    this.game = {
      isStarted: true,
      mode: this.startGameForm.value.mode as string,
    };
  }
}
