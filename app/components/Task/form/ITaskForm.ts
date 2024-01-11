export interface ITaskForm {
  taskTitle: string;
  taskDescription: string;
  schedule: string;
  dueDate: string;
  RecurringTimeInterval: {
    choice: string;
    status: boolean;
  }[];
  DaysOfTheWeek: {
    choice: string;
    status: boolean;
  }[];
  priority: boolean;
  taskList: string;
  tags: string;
}
