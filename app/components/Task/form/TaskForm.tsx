import {
  defaultInitialValues,
  defaultScheduleValue,
  defaultTaskListChoice,
  defaultTimeInterval,
  defualtDayInterval,
} from "@/app/data/dataMatrix";
import { areArrayObjectsEqual } from "@/app/helpers/areArrayObjectsEqual";
import {
  Box,
  Container,
  DialogContent,
  TextField,
  TextareaAutosize,
} from "@/app/lib/MUI-core-v4";
import addTaskSchema from "@/app/schemas/addTaskSchema";
import dayIntervalService from "@/app/services/DayIntervalService";
import tagService from "@/app/services/TagService";
import taskListService from "@/app/services/TaskListSevice";
import taskService from "@/app/services/TaskService";
import timeIntervalService from "@/app/services/TimeIntervalService";
import { Field, Form, Formik } from "formik";
import TaskButtonGroup from "../common/TaskButtonGroup";
import TaskFormFooter from "../common/TaskFormFooter";
import { ITaskForm } from "./ITaskForm";

interface Props {
  taskId: string | undefined;
  onFormSubmit: (values: ITaskForm) => void;
  onAlertOpen: () => void;
  onClose: () => void;
}

const TaskForm = ({ taskId, onAlertOpen, onFormSubmit, onClose }: Props) => {
  const initialValues: ITaskForm = {
    taskName: defaultInitialValues.taskName,
    taskDescription: defaultInitialValues.taskDescription,
    schedule: defaultInitialValues.schedule,
    dueDate: defaultInitialValues.dueDate,
    timeIntervalData: defaultInitialValues.timeIntervalData,
    dayIntervalData: defaultInitialValues.dayIntervalData,
    priority: defaultInitialValues.priority,
    taskListName: defaultInitialValues.taskListName,
    tags: defaultInitialValues.tags,
    edit: defaultInitialValues.edit,
  };

  const taskExist = taskId ? taskService.get(taskId) : undefined;
  if (taskExist && taskId) {
    const { name, description, dueDate, priority, taskListId } = taskExist;
    const initialTaskList = taskListService.get(taskListId);
    const initialTimeInterval = timeIntervalService.getByTaskId(taskId);
    const initialDayInterval = dayIntervalService.getByTaskId(taskId);
    const initialTagData = tagService.getByTaskId(taskId);

    initialValues.taskName = name;
    initialValues.taskDescription = description;
    initialValues.dueDate = dueDate;
    initialValues.timeIntervalData = [
      {
        choice: "Daily",
        status:
          initialTimeInterval?.daily !== undefined
            ? initialTimeInterval?.daily
            : false,
      },
      {
        choice: "Weekly",
        status:
          initialTimeInterval?.weekly !== undefined
            ? initialTimeInterval?.weekly
            : false,
      },
      {
        choice: "Monthly",
        status:
          initialTimeInterval?.monthly !== undefined
            ? initialTimeInterval?.monthly
            : false,
      },
      {
        choice: "Yearly",
        status:
          initialTimeInterval?.yearly !== undefined
            ? initialTimeInterval?.yearly
            : false,
      },
    ];
    initialValues.dayIntervalData = [
      {
        choice: "Sunday",
        status:
          initialDayInterval?.sunday !== undefined
            ? initialDayInterval?.sunday
            : false,
      },
      {
        choice: "Monday",
        status:
          initialDayInterval?.monday !== undefined
            ? initialDayInterval?.monday
            : false,
      },
      {
        choice: "Tuesday",
        status:
          initialDayInterval?.tuesday !== undefined
            ? initialDayInterval?.tuesday
            : false,
      },
      {
        choice: "Wednesday",
        status:
          initialDayInterval?.wednesday !== undefined
            ? initialDayInterval?.wednesday
            : false,
      },
      {
        choice: "Thursday",
        status:
          initialDayInterval?.thursday !== undefined
            ? initialDayInterval?.thursday
            : false,
      },
      {
        choice: "Friday",
        status:
          initialDayInterval?.friday !== undefined
            ? initialDayInterval?.friday
            : false,
      },
      {
        choice: "Saturday",
        status:
          initialDayInterval?.saturday !== undefined
            ? initialDayInterval?.saturday
            : false,
      },
    ];
    initialValues.priority = priority;
    initialValues.taskListName = initialTaskList?.name || defaultTaskListChoice;
    initialValues.tags = initialTagData?.name || defaultInitialValues.tags;
    initialValues.edit = true;

    // setting initial schedule
    const sameTimeInterval = areArrayObjectsEqual(
      initialValues.timeIntervalData,
      defaultTimeInterval
    );
    const sameDayInterval = areArrayObjectsEqual(
      initialValues.dayIntervalData,
      defualtDayInterval
    );
    const defaultIntervals = sameTimeInterval && sameDayInterval;

    if (
      defaultIntervals &&
      initialValues.taskListName === defaultScheduleValue
    ) {
      initialValues.schedule = defaultScheduleValue;
    } else if (initialValues.dueDate !== "") {
      initialValues.schedule = "Date";
    } else if (
      !defaultIntervals ||
      initialValues.taskListName !== defaultScheduleValue
    ) {
      initialValues.schedule = "Custom";
    }
  } else {
    initialValues.taskName = defaultInitialValues.taskName;
    initialValues.taskDescription = defaultInitialValues.taskDescription;
    initialValues.schedule = defaultInitialValues.schedule;
    initialValues.dueDate = defaultInitialValues.dueDate;
    initialValues.timeIntervalData = defaultInitialValues.timeIntervalData;
    initialValues.dayIntervalData = defaultInitialValues.dayIntervalData;
    initialValues.priority = defaultInitialValues.priority;
    initialValues.taskListName = defaultInitialValues.taskListName;
    initialValues.tags = defaultInitialValues.tags;
    initialValues.edit = defaultInitialValues.edit;
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={addTaskSchema}
      onSubmit={(values) => {
        console.log("values:", values);
        onClose();
        onAlertOpen();
        onFormSubmit(values);
      }}
    >
      {({ setFieldValue, isSubmitting, errors, touched, values }) => (
        <Form>
          <DialogContent>
            <Container maxWidth="md" className="p-4">
              <Box className="mt-2">
                <Field
                  type="text"
                  name="taskName"
                  placeholder="Task Name"
                  as={TextField}
                  fullWidth
                  error={errors.taskName && touched.taskName ? true : false}
                  helperText={
                    errors.taskName && touched.taskName ? errors.taskName : ""
                  }
                />
              </Box>
              <Box className="mt-2">
                <Field
                  name="taskDescription"
                  placeholder="Task Description (Optional)"
                  as={TextareaAutosize}
                  className="size-full"
                />
              </Box>

              <TaskButtonGroup values={values} setFieldValue={setFieldValue} />

              <Box className="mt-2">
                <Field
                  name="tags"
                  placeholder="#Tags (Optional)"
                  as={TextareaAutosize}
                  className="size-full"
                />
              </Box>
            </Container>
          </DialogContent>

          <TaskFormFooter
            values={values}
            setFieldValue={setFieldValue}
            isSubmitting={isSubmitting}
            onClose={onClose}
          />
        </Form>
      )}
    </Formik>
  );
};

export default TaskForm;
