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
      const response = await axiosInstance.get<ITaskList[]>(endpoint);
      this.taskLists = response.data;
    } catch (error) {
      console.error("Error in loading data:", error);
    }
  }

  getAll(): ITaskList[] {
    return this.taskLists;
  }

  get(id: number): ITaskList | undefined {
    return this.taskLists.find((taskList) => taskList.id === id);
  }

  getByName(name: string): ITaskList | undefined {
    return this.taskLists.find((taskList) => taskList.name === name);
  }

  async create(newTaskList: ITaskList): Promise<ITaskList> {
    try {
      const response = await axiosInstance.post(endpoint, {
        name: newTaskList.name,
      });
      const newData: ITaskList = response.data;
      await this._loadData();
      return newData;
    } catch (error) {
      console.error("Error in creating data:", error);
      throw error;
    }
  }

  async update(id: number, newTaskList: ITaskList): Promise<ITaskList | null> {
    try {
      const response = await axiosInstance.put(`${endpoint}/${id}`, {
        name: newTaskList.name,
      });
      if ((response.status = 200)) {
        const updatedData: ITaskList = response.data;
        await this._loadData();
        return updatedData;
      } else {
        console.error("Error: No data with that ID");
        return null;
      }
    } catch (error) {
      console.error("Error in updating data:", error);
      throw error;
    }
  }

  async remove(id: number): Promise<ITaskList | null> {
    try {
      const response = await axiosInstance.delete(`${endpoint}/${id}`);

      if ((response.status = 200)) {
        const deletedTaskList: ITaskList = response.data;
        await this._loadData();
        return deletedTaskList;
      } else {
        console.error("Error: No data with that ID");
        return null;
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

const taskListService = new TaskListService();
export default taskListService;
