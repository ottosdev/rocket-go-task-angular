import { Component } from '@angular/core';
import { WelcomeSection } from '../welcome-section/welcome-section';
import { TaskListSection } from '../task-list-section/task-list-section';

@Component({
  selector: 'app-main-content',
  imports: [WelcomeSection, TaskListSection],
  templateUrl: './main-content.html',
  styleUrl: './main-content.css',
})
export class MainContent {}
