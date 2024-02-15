import {
  defaultDayInterval,
  defaultInitialValues,
  defaultScheduleValue,
  defaultTaskListChoice,
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
import { Field, Form, Formik } from "formik";
import TaskButtonGroup from "../common/TaskButtonGroup";
import TaskFormFooter from "../common/TaskFormFooter";
import ITaskForm from "./ITaskForm";

interface Props {
  taskId: number | undefined;
  onFormSubmit: (values: ITaskForm) => void;
  onAlertOpen: () => void;
  onClose: () => void;
}

const TaskForm = ({ taskId, onAlertOpen, onFormSubmit, onClose }: Props) => {
  const initialValues: ITaskForm = { ...defaultInitialValues };

  const loadTaskData = async () => {
    if (taskId) {
      const taskExist = taskService.get(taskId);
      if (taskExist) {
        const { name, description, dueAt, priority, taskListId, timeInterval } =
          taskExist;
        const initialTaskList = taskListService.get(taskListId);
        const initialDayInterval = dayIntervalService.getByTaskId(taskId);
        const initialTagData = tagService.getByTaskId(taskId);

        initialValues.id = taskId;
        initialValues.name = name;
        initialValues.description = description;
        initialValues.dueAt = dueAt === "" ? "" : dueAt;
        initialValues.timeInterval = timeInterval;
        initialValues.dayIntervalData = [
          {
            name: "Sunday",
            status:
              initialDayInterval?.sunday !== undefined
                ? initialDayInterval?.sunday
                : false,
          },
          {
            name: "Monday",
            status:
              initialDayInterval?.monday !== undefined
                ? initialDayInterval?.monday
                : false,
          },
          {
            name: "Tuesday",
            status:
              initialDayInterval?.tuesday !== undefined
                ? initialDayInterval?.tuesday
                : false,
          },
          {
            name: "Wednesday",
            status:
              initialDayInterval?.wednesday !== undefined
                ? initialDayInterval?.wednesday
                : false,
          },
          {
            name: "Thursday",
            status:
              initialDayInterval?.thursday !== undefined
                ? initialDayInterval?.thursday
                : false,
          },
          {
            name: "Friday",
            status:
              initialDayInterval?.friday !== undefined
                ? initialDayInterval?.friday
                : false,
          },
          {
            name: "Saturday",
            status:
              initialDayInterval?.saturday !== undefined
                ? initialDayInterval?.saturday
                : false,
          },
        ];
        initialValues.priority = priority;
        initialValues.taskList = initialTaskList?.name || defaultTaskListChoice;
        initialValues.tags = initialTagData?.name || defaultInitialValues.tags;

        const sameDayInterval = areArrayObjectsEqual(
          initialValues.dayIntervalData,
          defaultDayInterval
        );
        if (
          sameDayInterval &&
          initialValues.taskList === defaultScheduleValue
        ) {
          initialValues.schedule = defaultScheduleValue;
        } else if (initialValues.dueAt !== "") {
          initialValues.schedule = "Date";
        } else if (initialValues.taskList !== defaultScheduleValue) {
          initialValues.schedule = "Custom";
        }
      }
    } else {
      initialValues.id = defaultInitialValues.id;
      initialValues.name = defaultInitialValues.name;
      initialValues.description = defaultInitialValues.description;
      initialValues.schedule = defaultInitialValues.schedule;
      initialValues.dueAt = defaultInitialValues.dueAt;
      initialValues.timeInterval = defaultInitialValues.timeInterval;
      initialValues.dayIntervalData = [
        { name: "Sunday", status: false },
        { name: "Monday", status: false },
        { name: "Tuesday", status: false },
        { name: "Wednesday", status: false },
        { name: "Thursday", status: false },
        { name: "Friday", status: false },
        { name: "Saturday", status: false },
      ];
      initialValues.priority = defaultInitialValues.priority;
      initialValues.taskList = defaultInitialValues.taskList;
      initialValues.tags = defaultInitialValues.tags;
    }
  };

  loadTaskData();

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

              <TaskButtonGroup
                values={values}
                setValue={(field, fieldValue) =>
                  setFieldValue(field, fieldValue)
                }
              />

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
