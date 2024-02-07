import * as yup from "yup";

// Validation schema for TaskList
export const taskListSchema = yup
  .object()
  .shape({
    name: yup.string().required().min(5).max(50),
  })
  .noUnknown() // does not accept any values that is not included in the shape
  .strict(true); // this makes sure that the values given match the shape

// Validation schema for Task
export const taskSchema = yup
  .object()
  .shape({
    name: yup.string().required().max(100),
    description: yup.string().max(250),
    dueAt: yup.date(),
    priority: yup.boolean(),
    status: yup.boolean(),
    taskListId: yup.number().required(),
  })
  .noUnknown()
  .strict(true);

// Validation schema for TimeInterval
export const timeIntervalSchema = yup
  .object()
  .shape({
    daily: yup.boolean(),
    weekly: yup.boolean(),
    monthly: yup.boolean(),
    yearly: yup.boolean(),
    taskId: yup.number().required(),
  })
  .noUnknown()
  .strict(true);

// Validation schema for DayInterval
export const dayIntervalSchema = yup
  .object()
  .shape({
    sunday: yup.boolean(),
    monday: yup.boolean(),
    tuesday: yup.boolean(),
    wednesday: yup.boolean(),
    thursday: yup.boolean(),
    friday: yup.boolean(),
    saturday: yup.boolean(),
    taskId: yup.number().required(),
  })
  .noUnknown()
  .strict(true);

// Validation schema for Tag
export const tagSchema = yup
  .object()
  .shape({
    name: yup.string(),
    taskId: yup.number().required(),
  })
  .noUnknown()
  .strict(true);
