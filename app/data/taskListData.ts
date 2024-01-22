export interface ITaskList {
  id: string;
  name: string;
}

const dummyTaskListData: ITaskList[] = [
  {
    id: "0",
    name: "Today",
  },
  {
    id: "1",
    name: "Tomorrow",
  },
  {
    id: "2",
    name: "Unsorted",
  },
];

export default dummyTaskListData;
