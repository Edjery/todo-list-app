export interface ITaskData {
  taskId: string;
  taskName: string;
  taskDescription: string;
  dueDate: string;
  priority: boolean;
  status: boolean;
  taskListId: string;
}

const dummyTaskData: ITaskData[] = [
  {
    taskId: "0",
    taskName: "Check Email",
    taskDescription: "check the response from aq.com",
    dueDate: "",
    priority: true,
    status: false,
    taskListId: "0",
  },
];

export default dummyTaskData;
