import { Component, inject } from '@angular/core';
import { Header } from './shared/components/header/header';
import { MainContent } from './shared/components/main-content/main-content';
import { ModalControllerService } from './core/services/modal-controller.service';

@Component({
  selector: 'app-root',
  imports: [Header, MainContent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  private readonly _modalControllerService = inject(ModalControllerService);

  openModal() {
    this._modalControllerService.openModal();
  }
}
