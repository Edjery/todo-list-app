import ITaskList from "./Interfaces/ITaskList";
import axiosInstance from "./apiClient";

const endpoint = "/tasklist";

class TaskListService {
  taskLists: ITaskList[];

  constructor() {
    this.taskLists = [];
    this._loadData();
  }

  private async _loadData() {
    try {
      const response = await axiosInstance.get(endpoint);
      this.taskLists = response.data;
    } catch (error) {
      console.error("Error in loading data:", error);
    }
  }

  async getAll(): Promise<ITaskList[]> {
    await this._loadData();
    return this.taskLists;
  }

  async get(taskListId: string): Promise<ITaskList | undefined> {
    await this._loadData();
    return this.taskLists.find((taskList) => taskList.id === taskListId);
  }

  async getByName(taskListName: string): Promise<ITaskList | undefined> {
    await this._loadData();
    return this.taskLists.find((taskList) => taskList.name === taskListName);
  }

  async create(newTaskList: ITaskList): Promise<ITaskList> {
    try {
      const response = await axiosInstance.post(endpoint, newTaskList);
      const createdTaskList: ITaskList = response.data;
      return createdTaskList;
    } catch (error) {
      console.error("Error in creating data:", error);
      throw error;
    }
  }

  async update(
    taskListId: string,
    newTaskList: ITaskList
  ): Promise<ITaskList | null> {
    try {
      const response = await axiosInstance.put(
        `${endpoint}/${taskListId}`,
        newTaskList
      );
      if ((response.status = 200)) {
        const updatedTaskList: ITaskList = response.data;
        return updatedTaskList;
      } else {
        console.error("Error: No data with that ID");
        return null;
      }
    } catch (error) {
      console.error("Error in updating data:", error);
      throw error; // Propagate the error
    }
  }

  async remove(taskListId: string): Promise<ITaskList | null> {
    try {
      const response = await axiosInstance.delete(`${endpoint}/${taskListId}`);

      if ((response.status = 200)) {
        const deletedTaskList: ITaskList = response.data;
        return deletedTaskList;
      } else {
        console.error("Error: No data with that ID");
        return null;
      }
    } catch (error) {
      console.error(error);
      throw error; // Propagate the error
    }
  }
}

const taskListService = new TaskListService();
export default taskListService;
