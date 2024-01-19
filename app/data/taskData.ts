export interface ITaskData {
  taskId: string;
  dateCreated: string;
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
    dateCreated: "2024-01-05",
    taskName: "Check Email",
    taskDescription: "check the response from aq.com",
    dueDate: "",
    priority: true,
    status: false,
    taskListId: "0",
  },
  {
    taskId: "1",
    dateCreated: "2024-01-16",
    taskName: "Check Message",
    taskDescription: "check the response from tuplok",
    dueDate: "2024-01-16",
    priority: true,
    status: false,
    taskListId: "2",
  },
  {
    taskId: "2",
    dateCreated: "2024-01-19T08:37:36",
    taskName: "Wash dish",
    taskDescription: "",
    dueDate: "2024-01-16",
    priority: true,
    status: false,
    taskListId: "2",
  },
  {
    taskId: "3",
    dateCreated: "2024-01-19T08:38:36",
    taskName: "Cook soup",
    taskDescription: "",
    dueDate: "2024-01-16",
    priority: true,
    status: false,
    taskListId: "2",
  },
  {
    taskId: "4",
    dateCreated: "2024-01-19T08:39:36",
    taskName: "Back Massage at 4pm",
    taskDescription: "",
    dueDate: "2024-01-16",
    priority: true,
    status: false,
    taskListId: "2",
  },
];

export default dummyTaskData;
