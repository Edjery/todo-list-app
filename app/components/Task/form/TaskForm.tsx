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
  const initialValues: ITaskForm = { ...defaultInitialValues };

  const loadTaskData = async () => {
    if (taskId) {
      const taskExist = await taskService.get(taskId);
      if (taskExist) {
        const { name, description, dueDate, priority, taskListId } = taskExist;
        const initialTaskList = await taskListService.get(taskListId);
        const initialTimeInterval = await timeIntervalService.getByTaskId(
          taskId
        );
        const initialDayInterval = await dayIntervalService.getByTaskId(taskId);
        const initialTagData = await tagService.getByTaskId(taskId);

        initialValues.id = taskId;
        initialValues.name = name;
        initialValues.description = description;
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
        initialValues.taskList = initialTaskList?.name || defaultTaskListChoice;
        initialValues.tags = initialTagData?.name || defaultInitialValues.tags;

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
          initialValues.taskList === defaultScheduleValue
        ) {
          initialValues.schedule = defaultScheduleValue;
        } else if (initialValues.dueDate !== "") {
          initialValues.schedule = "Date";
        } else if (
          !defaultIntervals ||
          initialValues.taskList !== defaultScheduleValue
        ) {
          initialValues.schedule = "Custom";
        }
      }
    }
  };

  loadTaskData();
  console.log("initialValues", initialValues);

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
                  name="name"
                  placeholder="Task Name"
                  as={TextField}
                  fullWidth
                  error={errors.name && touched.name ? true : false}
                  helperText={errors.name && touched.name ? errors.name : ""}
                />
              </Box>
              <Box className="mt-2">
                <Field
                  name="description"
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
