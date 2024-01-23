import ITimeInterval from "./Interfaces/ITimeInterval";

class TimeIntervalService {
  timeIntervals: ITimeInterval[];

  constructor() {
    this.timeIntervals = [
      {
        id: "0",
        daily: true,
        weekly: false,
        monthly: false,
        yearly: false,
        taskId: "0",
      },
    ];
  }

  getAll(): ITimeInterval[] {
    return this.timeIntervals;
  }

  get(timeIntervalId: string): ITimeInterval | undefined {
    return this.timeIntervals.find(
      (timeInterval) => timeInterval.id === timeIntervalId
    );
  }

  getByTaskId(taskId: string): ITimeInterval | undefined {
    return this.timeIntervals.find(
      (timeInterval) => timeInterval.taskId === taskId
    );
  }

  create(newTimeInterval: ITimeInterval): ITimeInterval {
    this.timeIntervals.push(newTimeInterval);
    return newTimeInterval;
  }

  update(
    timeIntervalId: string,
    updatedTimeInterval: ITimeInterval
  ): ITimeInterval | null {
    const index = this.timeIntervals.findIndex(
      (timeInterval) => timeInterval.id === timeIntervalId
    );
    if (index !== -1) {
      this.timeIntervals[index] = {
        ...this.timeIntervals[index],
        ...updatedTimeInterval,
      };
      return this.timeIntervals[index];
    }
    return null; // 404 Not found
  }

  remove(timeIntervalId: string) {
    const index = this.timeIntervals.findIndex(
      (timeInterval) => timeInterval.id === timeIntervalId
    );
    if (index !== -1) {
      const removedTimeInterval = this.timeIntervals.splice(index, 1)[0];
      return removedTimeInterval; // Successfully removed
    }
  }
}

const timeIntervalService = new TimeIntervalService();
export default timeIntervalService;
