import { IDayInterval } from "../data/dayIntervalData";

class DayIntervalService {
  dayIntervals: IDayInterval[];

  constructor() {
    this.dayIntervals = [
      {
        id: "0",
        sunday: false,
        monday: true,
        tuesday: false,
        wednesday: false,
        thursday: false,
        friday: false,
        saturday: false,
        taskId: "0",
      },
    ];
  }

  getAll(): IDayInterval[] {
    return this.dayIntervals;
  }

  get(dayIntervalId: string): IDayInterval | undefined {
    return this.dayIntervals.find(
      (dayInterval) => dayInterval.id === dayIntervalId
    );
  }

  create(newDayInterval: IDayInterval): IDayInterval {
    this.dayIntervals.push(newDayInterval);
    return newDayInterval;
  }

  update(
    dayIntervalId: string,
    updatedDayInterval: IDayInterval
  ): IDayInterval | null {
    const index = this.dayIntervals.findIndex(
      (dayInterval) => dayInterval.id === dayIntervalId
    );
    if (index !== -1) {
      this.dayIntervals[index] = {
        ...this.dayIntervals[index],
        ...updatedDayInterval,
      };
      return this.dayIntervals[index];
    }
    return null; // 404 Not found
  }

  remove(dayIntervalId: string) {
    const index = this.dayIntervals.findIndex(
      (dayInterval) => dayInterval.id === dayIntervalId
    );
    if (index !== -1) {
      const removedDayInterval = this.dayIntervals.splice(index, 1)[0];
      return removedDayInterval; // Successfully removed
    }
  }
}

const dayIntervalService = new DayIntervalService();
export default dayIntervalService;
