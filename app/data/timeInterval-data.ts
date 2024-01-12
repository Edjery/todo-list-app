export interface ITimeInterval {
  timeIntervalId: string;
  daily: boolean;
  weekly: boolean;
  monthly: boolean;
  yearly: boolean;
  taskId: string;
}

const dummyTimeInterval: ITimeInterval[] = [
  {
    timeIntervalId: "0",
    daily: true,
    weekly: false,
    monthly: false,
    yearly: false,
    taskId: "0",
  },
];

export default dummyTimeInterval;
