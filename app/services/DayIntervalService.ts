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

  getAll(): IDayInterval[] {
    return this.dayIntervals;
  }

  get(dayIntervalId: number): IDayInterval | undefined {
    return this.dayIntervals.find(
      (dayInterval) => dayInterval.id === dayIntervalId
    );
  }

  getByTaskId(taskId: number): IDayInterval | undefined {
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
        taskId: newDayInterval.taskId,
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
    dayIntervalId: number,
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
        taskId: newDayInterval.taskId,
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
      throw error;
    }
  }

  async remove(dayIntervalId: number) {
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
      throw error;
    }
  }
}

const dayIntervalService = new DayIntervalService();
export default dayIntervalService;
