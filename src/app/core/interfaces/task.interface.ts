export interface ITask {
  id: string;
  name: string;
  description: string;
  status: TaskStatus;
  comments: IComment[];
}

export interface IComment {
  id: string;
  description: string;
}

export enum TaskStatusEnum {
  TODO = 'to-do',
  DOING = 'doing',
  DONE = 'done',
}

export type TaskStatus = TaskStatusEnum.TODO | TaskStatusEnum.DOING | TaskStatusEnum.DONE;
