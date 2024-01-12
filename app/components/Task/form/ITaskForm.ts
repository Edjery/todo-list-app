export interface ITaskForm {
  taskName: string;
  taskDescription: string;
  schedule: string;
  dueDate: string;
  timeInterval: {
    choice: string;
    status: boolean;
  }[];
  dayInterval: {
    choice: string;
    status: boolean;
  }[];
  priority: boolean;
  taskList: string;
  tags: string;
  edit: boolean;
}
