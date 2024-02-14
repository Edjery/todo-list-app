interface ITask {
  id: number;
  name: string;
  description: string;
  dueAt: string;
  priority: boolean;
  status: boolean;
  createdAt: string;
  timeInterval: string;
  taskListId: number;
}

export default ITask;
