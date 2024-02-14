import * as yup from "yup";

const taskFormSchema = yup.object({
  id: yup.string().nullable(),
  name: yup.string().required("Name is required"),
  description: yup.string(),
  schedule: yup.string(),
  dueAt: yup.string(),
  timeIntervalData: yup.string(),
  dayIntervalData: yup.array().of(
    yup.object({
      choice: yup.string(),
      status: yup.boolean(),
    })
  ),
  priority: yup.boolean(),
  taskList: yup.string(),
  tags: yup.string(),
});

export default taskFormSchema;
