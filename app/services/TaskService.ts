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

  getAll(): ITask[] {
    return this.tasks;
  }

  get(id: number): ITask | undefined {
    return this.tasks.find((task) => task.id === id);
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

  async update(id: number, newTask: ITask): Promise<ITask | null> {
    try {
      const response = await axiosInstance.put(`${endpoint}/${id}`, {
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
      throw error;
    }
  }

  async updateStatus(id: number): Promise<ITask | null> {
    const task = this.get(id);

    if (task) {
      try {
        const response = await axiosInstance.put(`${endpoint}/${id}`, {
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
        throw error;
      }
    }
    return null;
  }

  async remove(id: number): Promise<ITask | null> {
    try {
      const response = await axiosInstance.delete(`${endpoint}/${id}`);

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
      throw error;
    }
  }
}

const taskService = new TaskService();
export default taskService;
