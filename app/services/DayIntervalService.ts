import IDayInterval from "./Interfaces/IDayInterval";
import axiosInstance from "./apiClient";

const endpoint = "/dayinterval";

class DayIntervalService {
  dayIntervals: IDayInterval[];

  constructor() {
    this.dayIntervals = [];
    this._loadData();
  }

  private async _loadData() {
    try {
      const response = await axiosInstance.get(endpoint);
      this.dayIntervals = response.data;
    } catch (error) {
      console.error("Error in loading data:", error);
    }
  }

  async getAll(): Promise<IDayInterval[]> {
    await this._loadData();
    return this.dayIntervals;
  }

  async get(dayIntervalId: string): Promise<IDayInterval | undefined> {
    await this._loadData();
    return this.dayIntervals.find(
      (dayInterval) => dayInterval.id === dayIntervalId
    );
  }

  async getByTaskId(taskId: string): Promise<IDayInterval | undefined> {
    await this._loadData();
    return this.dayIntervals.find(
      (dayInterval) => dayInterval.taskId === taskId
    );
  }

  async create(newDayInterval: IDayInterval): Promise<IDayInterval> {
    try {
      const response = await axiosInstance.post(endpoint, {
        sunday: newDayInterval.sunday,
        monday: newDayInterval.monday,
        tuesday: newDayInterval.tuesday,
        wednesday: newDayInterval.wednesday,
        thursday: newDayInterval.thursday,
        friday: newDayInterval.friday,
        saturday: newDayInterval.saturday,
        taskId: parseInt(newDayInterval.taskId),
      });
      const newData: IDayInterval = response.data;
      await this._loadData();
      return newData;
    } catch (error) {
      console.error("Error in creating data:", error);
      throw error;
    }
  }

  async update(
    dayIntervalId: string,
    newDayInterval: IDayInterval
  ): Promise<IDayInterval | null> {
    try {
      const response = await axiosInstance.put(`${endpoint}/${dayIntervalId}`, {
        sunday: newDayInterval.sunday,
        monday: newDayInterval.monday,
        tuesday: newDayInterval.tuesday,
        wednesday: newDayInterval.wednesday,
        thursday: newDayInterval.thursday,
        friday: newDayInterval.friday,
        saturday: newDayInterval.saturday,
        taskId: parseInt(newDayInterval.taskId),
      });
      if ((response.status = 200)) {
        const updatedData: IDayInterval = response.data;
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

  async remove(dayIntervalId: string) {
    try {
      const response = await axiosInstance.delete(
        `${endpoint}/${dayIntervalId}`
      );

      if ((response.status = 200)) {
        const deletedTaskList: IDayInterval = response.data;
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

const dayIntervalService = new DayIntervalService();
export default dayIntervalService;
