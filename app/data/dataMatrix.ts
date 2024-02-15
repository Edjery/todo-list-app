import ObjectStatus from "../components/Task/common/interface/IObjectStatus";
import ITaskForm from "../components/Task/form/ITaskForm";

export const sortList = ["Date Created", "Name"];

export const defaultScheduleValue = "Today";
export const defaultTaskListChoice = "New List";
export const defaultPriorityValue = false;

export const intervals = ["Daily", "Weekly", "Monthly", "Yearly"];
export const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export const defaultDayInterval: ObjectStatus[] = days.map((item) => ({
  name: item,
  status: false,
}));

export const defaultInitialValues: ITaskForm = {
  id: undefined,
  name: "",
  description: "",
  schedule: defaultScheduleValue,
  dueAt: "",
  timeInterval: "",
  dayIntervalData: defaultDayInterval,
  priority: defaultPriorityValue,
  taskList: defaultTaskListChoice,
  tags: "",
};
