import ITask from "./Interfaces/ITask";

class TaskService {
  tasks: ITask[];

  constructor() {
    this.tasks = [
      {
        id: "0",
        dateCreated: "2024-01-05",
        name: "Check Email",
        description: "check the response from aq.com",
        dueDate: "",
        priority: true,
        status: false,
        taskListId: "0",
      },
      {
        id: "1",
        dateCreated: "2024-01-16",
        name: "Check Message",
        description: "check the response from tuplok",
        dueDate: "2024-01-16",
        priority: true,
        status: false,
        taskListId: "2",
      },
      {
        id: "2",
        dateCreated: "2024-01-19T08:37:36",
        name: "Wash dish",
        description: "",
        dueDate: "2024-01-16",
        priority: true,
        status: false,
        taskListId: "2",
      },
      {
        id: "3",
        dateCreated: "2024-01-19T08:38:36",
        name: "Cook soup",
        description: "",
        dueDate: "2024-01-16",
        priority: true,
        status: false,
        taskListId: "2",
      },
      {
        id: "4",
        dateCreated: "2024-01-19T08:39:36",
        name: "Back Massage at 4pm",
        description: "",
        dueDate: "2024-01-16",
        priority: true,
        status: false,
        taskListId: "2",
      },
    ];
  }

  getAll(): ITask[] {
    return this.tasks;
  }

  get(taskId: string): ITask | undefined {
    return this.tasks.find((task) => task.id === taskId);
  }

  create(newTask: ITask): ITask {
    this.tasks.push(newTask);
    return newTask;
  }

  update(taskId: string, updatedTask: ITask): ITask | null {
    const index = this.tasks.findIndex((task) => task.id === taskId);
    if (index !== -1) {
      this.tasks[index] = { ...this.tasks[index], ...updatedTask };
      return this.tasks[index];
    }
    return null; // Task not found
  }

  remove(taskId: string) {
    const index = this.tasks.findIndex((task) => task.id === taskId);
    if (index !== -1) {
      const removedTaskList = this.tasks.splice(index, 1)[0];
      return removedTaskList; // Successfully removed
    }
  }
}

const taskService = new TaskService();

export default taskService;
