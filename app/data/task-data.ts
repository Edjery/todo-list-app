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
  {
    taskId: "1",
    taskName: "Check Message",
    taskDescription: "check the response from tuplok",
    dueDate: "2024-01-16",
    priority: true,
    status: false,
    taskListId: "2",
  },
];

export default dummyTaskData;
