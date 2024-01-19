export interface IDayInterval {
  dayIntervalValId: string;
  sunday: boolean;
  monday: boolean;
  tuesday: boolean;
  wednesday: boolean;
  thursday: boolean;
  friday: boolean;
  saturday: boolean;
  taskId: string;
}

const dummyDayInterval: IDayInterval[] = [
  {
    dayIntervalValId: "0",
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

export default dummyDayInterval;
