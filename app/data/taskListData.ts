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
    taskListId: "2",
    taskListName: "Unsorted",
  },
];

export default dummyTaskListData;
