import { Component, inject } from '@angular/core';
import { ModalControllerService } from '../../../core/services/modal-controller.service';
import { TaskService } from '../../../core/services/task.service';

@Component({
  selector: 'app-welcome-section',
  imports: [],
  templateUrl: './welcome-section.html',
  styleUrl: './welcome-section.css',
})
export class WelcomeSection {
  private readonly _modalControllerService = inject(ModalControllerService);
  private readonly _taskService = inject(TaskService);

  openNewTaskModal(): void {
    const dialogRef = this._modalControllerService.openModal();

    dialogRef.closed.subscribe((taskForm) => {
      if (taskForm) {
        this._taskService.createNewTask(taskForm);
      }
    });
  }
}
