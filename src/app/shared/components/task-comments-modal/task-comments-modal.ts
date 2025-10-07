import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IComment, ITask } from '../../../core/interfaces/task.interface';
import { generateIdWithTimestamp } from '../../../core/utils/generate-id';
import { TaskService } from '../../../core/services/task.service';

@Component({
  selector: 'app-task-comments-modal',
  imports: [ReactiveFormsModule],
  templateUrl: './task-comments-modal.html',
  styleUrl: './task-comments-modal.css',
})
export class TaskCommentsModal {
  formGroup!: FormGroup;
  taskCommentsChange: boolean = false;
  @ViewChild('descriptionInput') descriptionInput!: ElementRef<HTMLInputElement>;

  readonly _task: ITask = inject(DIALOG_DATA);
  private readonly _formBuilder = inject(FormBuilder);
  private readonly _dialogRef = inject(DialogRef);
  private readonly _taskService = inject(TaskService);

  ngOnInit() {
    //focando no input após abrir o modal
    this.descriptionInput?.nativeElement.focus();
    this.formGroup = this._formBuilder.group({
      description: ['', [Validators.required]],
    });
  }

  onSubmit() {
    const newComment: IComment = {
      id: generateIdWithTimestamp(),
      description: this.formGroup.value.description,
    };

    this._task.comments.unshift(newComment);
    this.formGroup.reset();
    this.taskCommentsChange = true;
    this.descriptionInput?.nativeElement.focus();
  }

  onCloseModal() {
    this._dialogRef.close(this.taskCommentsChange);
  }

  get isFormInvalid(): boolean {
    return this.formGroup.invalid;
  }

  get validateDescription() {
    const field = this.formGroup.get('description');
    return field?.invalid && (field?.touched || field?.dirty);
  }

  deleteComment(commentId: string) {
    this._task.comments = this._task.comments.filter((comment) => comment.id !== commentId);
    this.taskCommentsChange = true;
  }
}
