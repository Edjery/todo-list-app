interface ITask {
  id: string;
  dateCreated: string;
  name: string;
  description: string;
  dueDate: string;
  priority: boolean;
  status: boolean;
  taskListId: string;
}

export default ITask;
