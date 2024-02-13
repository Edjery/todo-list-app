import ITimeInterval from "./Interfaces/ITimeInterval";
import axiosInstance from "./apiClient";

const API_ENDPOINT = "/timeinterval";

class TimeIntervalService {
  private timeIntervals: ITimeInterval[] = [];

  constructor() {
    this.loadData();
  }

  private async loadData() {
    try {
      const response = await axiosInstance.get<ITimeInterval[]>(API_ENDPOINT);
      this.timeIntervals = response.data;
    } catch (error) {
      console.error("Error in loading data:", error);
      throw error;
    }
  }

  async getAll(): Promise<ITimeInterval[]> {
    const response = await axiosInstance.get<ITimeInterval[]>(API_ENDPOINT);
    return response.data;
  }

  get(id: number): ITimeInterval | undefined {
    return this.timeIntervals.find((item) => item.id === id);
  }

  getByTaskId(id: number): ITimeInterval | undefined {
    return this.timeIntervals.find((item) => item.taskId === id);
  }

  async create(newTimeInterval: ITimeInterval): Promise<ITimeInterval> {
    try {
      const response = await axiosInstance.post<ITimeInterval>(API_ENDPOINT, {
        daily: newTimeInterval.daily,
        weekly: newTimeInterval.weekly,
        monthly: newTimeInterval.monthly,
        yearly: newTimeInterval.yearly,
        taskId: newTimeInterval.taskId,
      });
      const newData = response.data;
      this.timeIntervals.push(newData);
      return newData;
    } catch (error) {
      console.error("Error in creating data:", error);
      throw error;
    }
  }

  async update(
    id: number,
    newTimeInterval: ITimeInterval
  ): Promise<ITimeInterval | null> {
    try {
      const response = await axiosInstance.put<ITimeInterval>(
        `${API_ENDPOINT}/${id}`,
        {
          daily: newTimeInterval.daily,
          weekly: newTimeInterval.weekly,
          monthly: newTimeInterval.monthly,
          yearly: newTimeInterval.yearly,
          taskId: newTimeInterval.taskId,
        }
      );
      if ((response.status = 200)) {
        const updatedData = response.data;
        const index = this.timeIntervals.findIndex((item) => item.id === id);
        if (index !== -1) {
          this.timeIntervals[index] = { ...updatedData };
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

  async remove(id: number): Promise<ITimeInterval | null> {
    try {
      const response = await axiosInstance.delete<ITimeInterval>(
        `${API_ENDPOINT}/${id}`
      );

      if ((response.status = 200)) {
        const deletedTaskList = response.data;
        this.timeIntervals = this.timeIntervals.filter(
          (item) => item.id !== id
        );
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

const timeIntervalService = new TimeIntervalService();
export default timeIntervalService;
