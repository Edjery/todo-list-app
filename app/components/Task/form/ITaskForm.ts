interface ITaskForm {
  id: number | undefined;
  name: string;
  description: string;
  schedule: string;
  dueAt: string;
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
export default ITaskForm;
