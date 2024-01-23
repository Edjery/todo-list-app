import ITaskList from "./Interfaces/ITaskList";

class TaskListService {
  taskLists: ITaskList[];

  constructor() {
    this.taskLists = [
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
  }

  getAll(): ITaskList[] {
    return this.taskLists;
  }

  get(taskListId: string): ITaskList | undefined {
    return this.taskLists.find((taskList) => taskList.id === taskListId);
  }

  create(newTaskList: ITaskList): ITaskList {
    this.taskLists.push(newTaskList);
    return newTaskList;
  }

  update(taskListId: string, updatedTaskList: ITaskList): ITaskList | null {
    const index = this.taskLists.findIndex(
      (taskList) => taskList.id === taskListId
    );
    if (index !== -1) {
      this.taskLists[index] = { ...this.taskLists[index], ...updatedTaskList };
      return this.taskLists[index];
    }
    return null; // Task list not found
  }

  remove(taskListId: string) {
    const index = this.taskLists.findIndex(
      (taskList) => taskList.id === taskListId
    );
    if (index !== -1) {
      const removedTaskList = this.taskLists.splice(index, 1)[0];
      return removedTaskList; // Successfully removed
    }
  }
}

const taskListService = new TaskListService();
export default taskListService;
