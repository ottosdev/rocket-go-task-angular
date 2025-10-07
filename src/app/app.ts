import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './shared/components/header/header';
import { MainContent } from './shared/components/main-content/main-content';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, MainContent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('rocket-go-task');
}
