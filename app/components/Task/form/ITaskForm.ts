export interface ITaskForm {
  taskName: string;
  taskDescription: string;
  schedule: string;
  dueDate: string;
  timeIntervalData: {
    choice: string;
    status: boolean;
  }[];
  dayIntervalData: {
    choice: string;
    status: boolean;
  }[];
  priority: boolean;
  taskListName: string;
  tags: string;
  edit: boolean;
}
