import { Component, inject, Input } from '@angular/core';
import { ModalControllerService } from '../../../core/services/modal-controller.service';
import { ReactiveFormsModule } from '@angular/forms';
import { ITask } from '../../../core/interfaces/task.interface';
import { TaskService } from '../../../core/services/task.service';
import { SlicePipe } from '@angular/common';
@Component({
  selector: 'app-task-card',
  imports: [ReactiveFormsModule, SlicePipe],
  templateUrl: './task-card.html',
  styleUrl: './task-card.css',
})
export class TaskCard {
  @Input({ required: true }) task!: ITask;
  private readonly _modalControllerService = inject(ModalControllerService);
  private readonly _taskService = inject(TaskService);

  openEditTaskModal(): void {
    const dialogRef = this._modalControllerService.openModalEdit({
      name: this.task.name,
      description: this.task.description,
    });

    dialogRef.closed.subscribe((result) => {
      if (result) {
        this._taskService.updateTaskAndDescription(this.task.id, this.task.status, result);
      }
    });
  }

  deleteTask() {
    this._taskService.deleteTask(this.task.id, this.task.status);
  }

  openModalComments() {
    const dialogRef = this._modalControllerService.openModalComments(this.task);
    dialogRef.closed.subscribe((taskCommentsChanged) => {
      if (taskCommentsChanged) {
        this._taskService.updateTaskComments(this.task.id, this.task.status, this.task.comments);
      }
    });
  }
}
