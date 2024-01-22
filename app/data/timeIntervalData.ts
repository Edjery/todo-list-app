export interface ITimeInterval {
  id: string;
  daily: boolean;
  weekly: boolean;
  monthly: boolean;
  yearly: boolean;
  taskId: string;
}

const dummyTimeInterval: ITimeInterval[] = [
  {
    id: "0",
    daily: true,
    weekly: false,
    monthly: false,
    yearly: false,
    taskId: "0",
  },
];

export default dummyTimeInterval;
