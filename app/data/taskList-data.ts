export interface ITaskListData {
  taskListId: string;
  taskListName: string;
}

const dummyTaskListData: ITaskListData[] = [
  {
    taskListId: "0",
    taskListName: "Today",
  },
  {
    taskListId: "1",
    taskListName: "Tomorrow",
  },
  {
    taskListId: "3",
    taskListName: "Unsorted",
  },
];

export default dummyTaskListData;
