import { ITaskForm } from "../components/Task/form/ITaskForm";

export const sortList = ["Default", "Date Created", "Name"];

export const defaultScheduleValue = "Today";
export const defaultTaskListChoice = "New List";
export const defaultPriorityValue = false;

export const defaultTimeInterval = [
  { choice: "Daily", status: false },
  { choice: "Weekly", status: false },
  { choice: "Monthly", status: false },
  { choice: "Yearly", status: false },
];
export const defualtDayInterval = [
  { choice: "Sunday", status: false },
  { choice: "Monday", status: false },
  { choice: "Tuesday", status: false },
  { choice: "Wednesday", status: false },
  { choice: "Thursday", status: false },
  { choice: "Friday", status: false },
  { choice: "Saturday", status: false },
];

export const defaultInitialValues: ITaskForm = {
  taskName: "",
  taskDescription: "",
  schedule: defaultScheduleValue,
  dueDate: "",
  timeInterval: defaultTimeInterval,
  dayInterval: defualtDayInterval,
  priority: defaultPriorityValue,
  taskList: defaultTaskListChoice,
  tags: "",
  edit: false,
};
