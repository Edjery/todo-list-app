interface ITask {
  id: number;
  dateCreated: string;
  name: string;
  description: string;
  dueDate: string;
  priority: boolean;
  status: boolean;
  taskListId: number;
}

export default ITask;
