import ITask from "./Interfaces/ITask";
import axiosInstance from "./apiClient";

const endpoint = "/task";

class TaskService {
  tasks: ITask[];

  constructor() {
    this.tasks = [];
    this._loadData();
  }

  private async _loadData() {
    try {
      const response = await axiosInstance.get<ITask[]>(endpoint);
      this.tasks = response.data;
    } catch (error) {
      console.error("Error in loading data:", error);
    }
  }

  async getAll(): Promise<ITask[]> {
    await this._loadData();
    return this.tasks;
  }

  async get(taskId: string): Promise<ITask | undefined> {
    await this._loadData();
    return this.tasks.find((task) => task.id === taskId);
  }

  async create(newTask: ITask): Promise<ITask> {
    try {
      const response = await axiosInstance.post(endpoint, {
        name: newTask.name,
        description: newTask.description,
        dueAt: newTask.dueDate,
        priority: newTask.priority,
        status: newTask.status,
        taskListId: newTask.taskListId,
      });
      const newData: ITask = response.data;
      await this._loadData();
      return newData;
    } catch (error) {
      console.error("Error in creating data:", error);
      throw error;
    }
  }

  async update(taskId: string, newTask: ITask): Promise<ITask | null> {
    try {
      const response = await axiosInstance.put(`${endpoint}/${taskId}`, {
        name: newTask.name,
        description: newTask.description,
        dueAt: newTask.dueDate,
        priority: newTask.priority,
        status: newTask.status,
        taskListId: newTask.taskListId,
      });
      if ((response.status = 200)) {
        const updatedData: ITask = response.data;
        await this._loadData();
        return updatedData;
      } else {
        console.error("Error: No data with that ID");
        return null;
      }
    } catch (error) {
      console.error("Error in updating data:", error);
      throw error; // Propagate the error
    }
  } // TODO

  async updateStatus(taskId: string): Promise<ITask | null> {
    const task = this.tasks.find((task) => task.id === taskId);

    if (task) {
      try {
        const response = await axiosInstance.put(`${endpoint}/${taskId}`, {
          name: task.name,
          description: task.description,
          dueAt: task.dueDate,
          priority: task.priority,
          status: !task.status,
          taskListId: task.taskListId,
        });
        if ((response.status = 200)) {
          const updatedData: ITask = response.data;
          await this._loadData();
          return updatedData;
        } else {
          console.error("Error: No data with that ID");
          return null;
        }
      } catch (error) {
        console.error("Error in updating data:", error);
        throw error; // Propagate the error
      }
    }
    return null;
  }

  async remove(taskId: string) {
    try {
      const response = await axiosInstance.delete(`${endpoint}/${taskId}`);

      if ((response.status = 200)) {
        const deletedTaskList: ITask = response.data;
        await this._loadData();
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

const taskService = new TaskService();
export default taskService;
