import * as yup from "yup";

const addTaskSchema = yup.object({
  taskName: yup.string().required("Required"),
  taskDescription: yup.string(),
  schedule: yup.string(),
  dueDate: yup.string(),
  intervals: yup.string(),
  days: yup.string(),
  priority: yup.string(),
  taskList: yup.string(),
  tags: yup.string(),
  edit: yup.boolean(),
});

export default addTaskSchema;
