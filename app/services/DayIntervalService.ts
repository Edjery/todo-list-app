import IDayInterval from "./Interfaces/IDayInterval";
import axiosInstance from "./apiClient";

const API_ENDPOINT = "/dayinterval";

class DayIntervalService {
  private dayIntervals: IDayInterval[] = [];

  constructor() {
    this.loadData();
  }

  private async loadData() {
    try {
      const response = await axiosInstance.get<IDayInterval[]>(API_ENDPOINT);
      this.dayIntervals = response.data;
    } catch (error) {
      console.error("Error in loading data:", error);
    }
  }

  async getAll(): Promise<IDayInterval[]> {
    const response = await axiosInstance.get<IDayInterval[]>(API_ENDPOINT);
    return response.data;
  }

  get(id: number): IDayInterval | undefined {
    return this.dayIntervals.find((item) => item.id === id);
  }

  getByTaskId(id: number): IDayInterval | undefined {
    return this.dayIntervals.find((item) => item.taskId === id);
  }

  async create(newDayInterval: IDayInterval): Promise<IDayInterval> {
    try {
      const response = await axiosInstance.post<IDayInterval>(API_ENDPOINT, {
        sunday: newDayInterval.sunday,
        monday: newDayInterval.monday,
        tuesday: newDayInterval.tuesday,
        wednesday: newDayInterval.wednesday,
        thursday: newDayInterval.thursday,
        friday: newDayInterval.friday,
        saturday: newDayInterval.saturday,
        taskId: newDayInterval.taskId,
      });
      const newData: IDayInterval = response.data;
      this.dayIntervals.push(newData);
      return newData;
    } catch (error) {
      console.error("Error in creating data:", error);
      throw error;
    }
  }

  async update(
    id: number,
    newDayInterval: IDayInterval
  ): Promise<IDayInterval | null> {
    try {
      const response = await axiosInstance.put<IDayInterval>(
        `${API_ENDPOINT}/${id}`,
        {
          sunday: newDayInterval.sunday,
          monday: newDayInterval.monday,
          tuesday: newDayInterval.tuesday,
          wednesday: newDayInterval.wednesday,
          thursday: newDayInterval.thursday,
          friday: newDayInterval.friday,
          saturday: newDayInterval.saturday,
          taskId: newDayInterval.taskId,
        }
      );
      if ((response.status = 200)) {
        const updatedData = response.data;
        const index = this.dayIntervals.findIndex((item) => item.id === id);
        if (index !== -1) {
          this.dayIntervals[index] = { ...updatedData };
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

  async remove(id: number): Promise<IDayInterval | null> {
    try {
      const response = await axiosInstance.delete(`${API_ENDPOINT}/${id}`);

      if ((response.status = 200)) {
        const deletedTaskList = response.data;
        this.dayIntervals = this.dayIntervals.filter((item) => item.id !== id);
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

const dayIntervalService = new DayIntervalService();
export default dayIntervalService;
