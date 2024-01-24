export interface ITaskForm {
  id: string | undefined;
  name: string;
  description: string;
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
  taskList: string;
  tags: string;
}
