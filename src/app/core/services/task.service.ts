import { Injectable } from '@angular/core';
import { BehaviorSubject, map, tap } from 'rxjs';
import { IComment, ITask, TaskStatus, TaskStatusEnum } from '../interfaces/task.interface';
import { ITaskFormControls } from '../interfaces/task-form-modal.interface';
import { generateIdWithTimestamp } from '../utils/generate-id';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  // A Fazer
  private todoTasks$ = new BehaviorSubject<ITask[]>(
    this.loadTasksFromLocalStorage(TaskStatusEnum.TODO) || [],
  );
  readonly todoTasks = this.todoTasks$.asObservable().pipe(
    map((tasks) => structuredClone(tasks)),
    tap((tasks) => this.saveTaskToLocalStorage(TaskStatusEnum.TODO, tasks)),
  );

  // Fazendo
  private doingTasks$ = new BehaviorSubject<ITask[]>(
    this.loadTasksFromLocalStorage(TaskStatusEnum.DOING) || [],
  );
  readonly doingTasks = this.doingTasks$.asObservable().pipe(
    map((tasks) => structuredClone(tasks)),
    tap((tasks) => this.saveTaskToLocalStorage(TaskStatusEnum.DOING, tasks)),
  );

  // Concluido
  private doneTasks$ = new BehaviorSubject<ITask[]>(
    this.loadTasksFromLocalStorage(TaskStatusEnum.DONE) || [],
  );
  readonly doneTasks = this.doneTasks$.asObservable().pipe(
    map((tasks) => structuredClone(tasks)),
    tap((tasks) => this.saveTaskToLocalStorage(TaskStatusEnum.DONE, tasks)),
  );

  createNewTask(task: ITaskFormControls): void {
    const newTask: ITask = {
      ...task,
      status: TaskStatusEnum.TODO,
      id: generateIdWithTimestamp(),
      comments: [],
    };

    const currentTasks = this.todoTasks$.value;
    this.todoTasks$.next([...currentTasks, newTask]);
  }

  updateTaskStatus(taskId: string, taskCurrentStatus: TaskStatus, taskNextStatus: TaskStatus) {
    const currentTaskList = this.getTaskListByStatus(taskCurrentStatus);
    const nextTaskList = this.getTaskListByStatus(taskNextStatus);

    const currentTask = currentTaskList.value.find((task) => task.id === taskId);
    if (!currentTask) return;

    if (currentTask) {
      currentTask.status = taskNextStatus;

      // remove from current list
      const updatedCurrentTaskList = currentTaskList.value.filter((task) => task.id !== taskId);
      currentTaskList.next([...updatedCurrentTaskList]);

      // add to next list
      const updatedNextTaskList = [...nextTaskList.value, { ...currentTask }];
      nextTaskList.next(updatedNextTaskList);
    }
  }

  private getTaskListByStatus(status: TaskStatus) {
    const taskListObj = {
      [TaskStatusEnum.TODO]: this.todoTasks$,
      [TaskStatusEnum.DOING]: this.doingTasks$,
      [TaskStatusEnum.DONE]: this.doneTasks$,
    };
    return taskListObj[status];
  }

  updateTaskAndDescription(
    taskId: string,
    taskCurrentStatus: TaskStatus,
    updatedTask: ITaskFormControls,
  ) {
    const currentTaskList = this.getTaskListByStatus(taskCurrentStatus);
    const updateTask = currentTaskList.value.find((task) => task.id === taskId);
    if (!updateTask) return;

    updateTask.name = updatedTask.name;
    updateTask.description = updatedTask.description;

    const updatedCurrentTaskList = currentTaskList.value.map((task) =>
      task.id === taskId ? { ...task, ...updateTask } : task,
    );
    currentTaskList.next([...updatedCurrentTaskList]);
  }

  updateTaskComments(taskId: string, taskCurrentStatus: TaskStatus, comments: IComment[]) {
    const currentTaskList = this.getTaskListByStatus(taskCurrentStatus);
    const updateTask = currentTaskList.value.find((task) => task.id === taskId);
    if (!updateTask) return;

    updateTask.comments = comments;

    const updatedCurrentTaskList = currentTaskList.value.map((task) =>
      task.id === taskId ? { ...task, ...updateTask } : task,
    );
    currentTaskList.next([...updatedCurrentTaskList]);
  }

  deleteTask(taskId: string, taskCurrentStatus: TaskStatus) {
    const currentTaskList = this.getTaskListByStatus(taskCurrentStatus);
    const task = currentTaskList.value.find((task) => task.id === taskId);
    if (!task) return;

    const updatedCurrentTaskList = currentTaskList.value.filter((task) => task.id !== taskId);
    currentTaskList.next([...updatedCurrentTaskList]);
  }

  private saveTaskToLocalStorage(key: string, tasks: ITask[]) {
    try {
      localStorage.setItem(key, JSON.stringify(tasks));
    } catch (error) {
      console.log('Erro ao salvar tarefas no localStorage', error);
    }
  }

  private loadTasksFromLocalStorage(key: string): ITask[] {
    try {
      const tasks = localStorage.getItem(key);
      return tasks ? (JSON.parse(tasks) as ITask[]) : [];
    } catch (error) {
      console.log('Erro ao carregar tarefas do localStorage', error);
      return [];
    }
  }
}
