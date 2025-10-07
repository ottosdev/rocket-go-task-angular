export interface ITaskFormModal {
  id?: string;
  mode: 'create' | 'edit';
  formValues: ITaskFormControls;
}

export interface ITaskFormControls {
  name: string;
  description: string;
}
