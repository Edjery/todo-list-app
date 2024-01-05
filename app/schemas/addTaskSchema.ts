import * as yup from "yup";

const addTaskSchema = yup.object({
  taskTitle: yup.string().required("Required"),
  taskDescription: yup.string(),
  schedule: yup.string(),
  dueDate: yup.string(),
  intervals: yup.string(),
  days: yup.string(),
  priority: yup.string(),
  taskList: yup.string(),
  tags: yup.string(),
});

export default addTaskSchema;
