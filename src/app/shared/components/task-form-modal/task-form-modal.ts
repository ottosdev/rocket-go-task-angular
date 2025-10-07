import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { Component, inject } from '@angular/core';
import {
  ITaskFormControls,
  ITaskFormModal,
} from '../../../core/interfaces/task-form-modal.interface';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-task-form-modal',
  imports: [ReactiveFormsModule],
  templateUrl: './task-form-modal.html',
  styleUrl: './task-form-modal.css',
})
export class TaskFormModal {
  private readonly _dialogData: ITaskFormModal = inject(DIALOG_DATA);
  private readonly _formBuilder = inject(FormBuilder);
  private readonly _dialogRef = inject(DialogRef);
  formGroup!: FormGroup;

  ngOnInit() {
    this.formGroup = this._formBuilder.group({
      name: [this._dialogData.formValues.name, [Validators.required, Validators.minLength(10)]],
      description: [
        this._dialogData.formValues.description,
        [Validators.required, Validators.minLength(10)],
      ],
    });
  }
  onSubmit() {
    this.closeModal(this.formGroup.value);
  }

  closeModal(formValues: ITaskFormControls | undefined = undefined) {
    this._dialogRef.close(formValues);
  }

  get modeTitle() {
    return this._dialogData.mode === 'create' ? 'Criar tarefa' : 'Editar tarefa';
  }

  get modeButtonTitle() {
    return this._dialogData.mode === 'create' ? 'Criar uma tarefa' : 'Editar uma tarefa';
  }

  get isInvalidForm(): boolean {
    return this.formGroup.invalid;
  }

  get showErrorNameMessage(): boolean | undefined {
    const field = this.formGroup.get('name');
    return field?.invalid && (field?.touched || field?.dirty);
  }

  get showErrorDescriptionMessage(): boolean | undefined {
    const field = this.formGroup.get('description');
    return field?.invalid && (field?.touched || field?.dirty);
  }
}
