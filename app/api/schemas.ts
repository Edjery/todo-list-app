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
    name: yup.string().required(),
    description: yup.string().nullable().default(null),
    dueAt: yup.string().nullable().default(null),
    priority: yup.boolean().default(false),
    status: yup.boolean().default(false),
    taskListId: yup.number().required(),
  })
  .noUnknown()
  .strict(true);

// Validation schema for TimeInterval
export const timeIntervalSchema = yup
  .object()
  .shape({
    daily: yup.boolean().default(false),
    weekly: yup.boolean().default(false),
    monthly: yup.boolean().default(false),
    yearly: yup.boolean().default(false),
    taskId: yup.number().required(),
  })
  .noUnknown()
  .strict(true);

// Validation schema for DayInterval
export const dayIntervalSchema = yup
  .object()
  .shape({
    sunday: yup.boolean().default(false),
    monday: yup.boolean().default(false),
    tuesday: yup.boolean().default(false),
    wednesday: yup.boolean().default(false),
    thursday: yup.boolean().default(false),
    friday: yup.boolean().default(false),
    saturday: yup.boolean().default(false),
    taskId: yup.number().required(),
  })
  .noUnknown()
  .strict(true);

// Validation schema for Tag
export const tagSchema = yup
  .object()
  .shape({
    name: yup.string().default(""),
    taskId: yup.number().required(),
  })
  .noUnknown()
  .strict(true);
