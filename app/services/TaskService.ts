import ITask from "./Interfaces/ITask";
import axiosInstance from "./apiClient";

const API_ENDPOINT = "/task";

class TaskService {
  private tasks: ITask[] = [];

  constructor() {
    this.loadData();
  }

  private async loadData(): Promise<void> {
    try {
      const response = await axiosInstance.get<ITask[]>(API_ENDPOINT);
      this.tasks = response.data;
    } catch (error) {
      console.error("Error in loading data:", error);
      throw error;
    }
  }

  async getAll(): Promise<ITask[]> {
    const response = await axiosInstance.get<ITask[]>(API_ENDPOINT);
    return response.data;
  }

  get(id: number): ITask | undefined {
    return this.tasks.find((task) => task.id === id);
  }

  async create(newTask: ITask): Promise<ITask> {
    try {
      const response = await axiosInstance.post<ITask>(API_ENDPOINT, {
        name: newTask.name,
        description: newTask.description,
        dueAt: newTask.dueAt,
        priority: newTask.priority,
        status: newTask.status,
        timeInterval: newTask.timeInterval,
        taskListId: newTask.taskListId,
      });
      const newData = response.data;
      this.tasks.push(newData);
      return newData;
    } catch (error) {
      console.error("Error in creating data:", error);
      throw error;
    }
  }

  async update(id: number, newTask: ITask): Promise<ITask | null> {
    try {
      const response = await axiosInstance.put<ITask>(`${API_ENDPOINT}/${id}`, {
        name: newTask.name,
        description: newTask.description,
        dueAt: newTask.dueAt,
        priority: newTask.priority,
        status: newTask.status,
        timeInterval: newTask.timeInterval,
        taskListId: newTask.taskListId,
      });
      if ((response.status = 200)) {
        const updatedData = response.data;
        const index = this.tasks.findIndex((item) => item.id === id);
        if (index !== -1) {
          this.tasks[index] = { ...updatedData };
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

  async updateStatus(id: number): Promise<ITask | null> {
    const task = this.get(id);
    if (!task) throw new Error("Data not found");

    const updatedTask = { ...task, status: !task.status };
    return this.update(id, updatedTask);
  }

  async remove(id: number): Promise<ITask | null> {
    try {
      const response = await axiosInstance.delete<ITask>(
        `${API_ENDPOINT}/${id}`
      );
      if ((response.status = 200)) {
        const deletedData = response.data;
        this.tasks = this.tasks.filter((task) => task.id !== id);
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

const taskService = new TaskService();
export default taskService;
