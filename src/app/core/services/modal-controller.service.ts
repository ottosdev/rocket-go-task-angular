import { inject, Injectable } from '@angular/core';
import { Dialog } from '@angular/cdk/dialog';
import { TaskFormModal } from '../../shared/components/task-form-modal/task-form-modal';
import { TaskCommentsModal } from '../../shared/components/task-comments-modal/task-comments-modal';
import { ITaskFormControls } from '../interfaces/task-form-modal.interface';
import { ITask } from '../interfaces/task.interface';
@Injectable({
  providedIn: 'root',
})
export class ModalControllerService {
  private readonly modalSizeOptions = {
    maxWidth: '620px',
    width: '95%',
  };
  private readonly _dialog = inject(Dialog);

  openModal() {
    return this._dialog.open<ITaskFormControls>(TaskFormModal, {
      ...this.modalSizeOptions,
      disableClose: true,
      data: {
        mode: 'create',
        formValues: {
          name: '',
          description: '',
        },
      },
    });
  }

  openModalEdit(formValues: ITaskFormControls) {
    return this._dialog.open<ITaskFormControls>(TaskFormModal, {
      ...this.modalSizeOptions,
      disableClose: true,
      data: {
        mode: 'edit',
        formValues,
      },
    });
  }

  openModalComments(task: ITask) {
    return this._dialog.open(TaskCommentsModal, {
      ...this.modalSizeOptions,
      disableClose: true,
      data: task,
    });
  }
}
