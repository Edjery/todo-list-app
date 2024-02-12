import ITimeInterval from "./Interfaces/ITimeInterval";
import axiosInstance from "./apiClient";

const endpoint = "/timeinterval";

class TimeIntervalService {
  timeIntervals: ITimeInterval[];

  constructor() {
    this.timeIntervals = [];
    this._loadData();
  }

  private async _loadData() {
    try {
      const response = await axiosInstance.get(endpoint);
      this.timeIntervals = response.data;
    } catch (error) {
      console.error("Error in loading data:", error);
    }
  }

  getAll(): ITimeInterval[] {
    return this.timeIntervals;
  }

  get(timeIntervalId: number): ITimeInterval | undefined {
    return this.timeIntervals.find(
      (timeInterval) => timeInterval.id === timeIntervalId
    );
  }

  getByTaskId(taskId: number): ITimeInterval | undefined {
    return this.timeIntervals.find(
      (timeInterval) => timeInterval.taskId === taskId
    );
  }

  async create(newTimeInterval: ITimeInterval): Promise<ITimeInterval> {
    try {
      const response = await axiosInstance.post(endpoint, {
        daily: newTimeInterval.daily,
        weekly: newTimeInterval.weekly,
        monthly: newTimeInterval.monthly,
        yearly: newTimeInterval.yearly,
        taskId: newTimeInterval.taskId,
      });
      const newData: ITimeInterval = response.data;
      await this._loadData();
      return newData;
    } catch (error) {
      console.error("Error in creating data:", error);
      throw error;
    }
  }

  async update(
    timeIntervalId: number,
    newTimeInterval: ITimeInterval
  ): Promise<ITimeInterval | null> {
    try {
      const response = await axiosInstance.put(
        `${endpoint}/${timeIntervalId}`,
        {
          daily: newTimeInterval.daily,
          weekly: newTimeInterval.weekly,
          monthly: newTimeInterval.monthly,
          yearly: newTimeInterval.yearly,
          taskId: newTimeInterval.taskId,
        }
      );
      if ((response.status = 200)) {
        const updatedData: ITimeInterval = response.data;
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

  async remove(timeIntervalId: number) {
    try {
      const response = await axiosInstance.delete(
        `${endpoint}/${timeIntervalId}`
      );

      if ((response.status = 200)) {
        const deletedTaskList: ITimeInterval = response.data;
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

const timeIntervalService = new TimeIntervalService();
export default timeIntervalService;
