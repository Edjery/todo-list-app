export interface ITask {
  id: string;
  dateCreated: string;
  name: string;
  description: string;
  dueDate: string;
  priority: boolean;
  status: boolean;
  taskListId: string;
}

const dummyTaskData: ITask[] = [
  {
    id: "0",
    dateCreated: "2024-01-05",
    name: "Check Email",
    description: "check the response from aq.com",
    dueDate: "",
    priority: true,
    status: false,
    taskListId: "0",
  },
  {
    id: "1",
    dateCreated: "2024-01-16",
    name: "Check Message",
    description: "check the response from tuplok",
    dueDate: "2024-01-16",
    priority: true,
    status: false,
    taskListId: "2",
  },
  {
    id: "2",
    dateCreated: "2024-01-19T08:37:36",
    name: "Wash dish",
    description: "",
    dueDate: "2024-01-16",
    priority: true,
    status: false,
    taskListId: "2",
  },
  {
    id: "3",
    dateCreated: "2024-01-19T08:38:36",
    name: "Cook soup",
    description: "",
    dueDate: "2024-01-16",
    priority: true,
    status: false,
    taskListId: "2",
  },
  {
    id: "4",
    dateCreated: "2024-01-19T08:39:36",
    name: "Back Massage at 4pm",
    description: "",
    dueDate: "2024-01-16",
    priority: true,
    status: false,
    taskListId: "2",
  },
];

export default dummyTaskData;
