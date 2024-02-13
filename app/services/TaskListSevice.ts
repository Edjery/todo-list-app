import ITaskList from "./Interfaces/ITaskList";
import axiosInstance from "./apiClient";

const API_ENDPOINT = "/tasklist";

class TaskListService {
  private taskLists: ITaskList[] = [];

  constructor() {
    this.loadData();
  }

  private async loadData(): Promise<void> {
    try {
      const response = await axiosInstance.get<ITaskList[]>(API_ENDPOINT);
      this.taskLists = response.data;
    } catch (error) {
      console.error("Error in loading data:", error);
      throw error;
    }
  }

  async getAll(): Promise<ITaskList[]> {
    const response = await axiosInstance.get<ITaskList[]>(API_ENDPOINT);
    return response.data;
  }

  get(id: number): ITaskList | undefined {
    return this.taskLists.find((item) => item.id === id);
  }

  getByName(name: string): ITaskList | undefined {
    return this.taskLists.find((item) => item.name === name);
  }

  async create(newTaskList: ITaskList): Promise<ITaskList> {
    try {
      const response = await axiosInstance.post<ITaskList>(API_ENDPOINT, {
        name: newTaskList.name,
      });
      const newData = response.data;
      this.taskLists.push(newData);
      return newData;
    } catch (error) {
      console.error("Error in creating data:", error);
      throw error;
    }
  }

  async update(id: number, newTaskList: ITaskList): Promise<ITaskList | null> {
    try {
      const response = await axiosInstance.put<ITaskList>(
        `${API_ENDPOINT}/${id}`,
        {
          name: newTaskList.name,
        }
      );
      if ((response.status = 200)) {
        const updatedData = response.data;
        const index = this.taskLists.findIndex((item) => item.id === id);
        if (index !== -1) {
          this.taskLists[index] = { ...updatedData };
        }
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
      const response = await axiosInstance.delete<ITaskList>(
        `${API_ENDPOINT}/${id}`
      );
      if ((response.status = 200)) {
        const deletedData = response.data;
        this.taskLists = this.taskLists.filter((item) => item.id !== id);
        return deletedData;
      } else {
        console.error("Error: No data with that ID");
        return null;
      }
    } catch (error) {
      console.error("Error in deleting data:", error);
      throw error;
    }
  }
}

const taskListService = new TaskListService();
export default taskListService;
