import todolistDummy from "@/app/data/todolist-dummy";
import {
  Box,
  Container,
  DialogContent,
  TextField,
  TextareaAutosize,
} from "@/app/lib/MUI-core-v4";
import addTaskSchema from "@/app/schemas/addTaskSchema";
import { Field, Form, Formik } from "formik";
import { useState } from "react";
import ITaskIndex from "../ITaskIndex";
import TaskButtonGroup from "../common/TaskButtonGroup";
import TaskFormFooter from "../common/TaskFormFooter";
import { ITaskForm } from "./ITaskForm";

const defaultScheduleValue = "Today";
const defaultPriorityValue = false;
const defaultTaskListChoice = "New List";
let currentTaskListChoice = defaultTaskListChoice;

const initialValues: ITaskForm = {
  taskTitle: "",
  taskDescription: "",
  schedule: defaultScheduleValue,
  dueDate: "",
  RecurringTimeInterval: [
    { choice: "Daily", status: false },
    { choice: "Weekly", status: false },
    { choice: "Monthly", status: false },
    { choice: "Yearly", status: false },
  ],
  DaysOfTheWeek: [
    { choice: "Sunday", status: false },
    { choice: "Monday", status: false },
    { choice: "Tuesday", status: false },
    { choice: "Wednesday", status: false },
    { choice: "Thursday", status: false },
    { choice: "Friday", status: false },
    { choice: "Saturday", status: false },
  ],
  priority: defaultPriorityValue,
  taskList: "",
  tags: "",
};

interface Props {
  onClose: () => void;
  onAlertOpen: () => void;
  task?: ITaskIndex | undefined;
}

const TaskForm = ({ onClose, onAlertOpen, task }: Props) => {
  const [scheduleValue, setScheduleValue] =
    useState<string>(defaultScheduleValue);

  if (task === undefined) {
    initialValues.taskTitle = "";
    initialValues.taskList = "";
    currentTaskListChoice = defaultTaskListChoice;
  } else {
    initialValues.taskTitle =
      todolistDummy.results[task.taskListIndex].Tasks[task.taskIndex].taskName;
    initialValues.taskList = todolistDummy.results[task.taskListIndex].Title;
    currentTaskListChoice = initialValues.taskList;
  }
  const submitButton = task ? "Edit Task" : "Add Task";

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={addTaskSchema}
      onSubmit={(values) => {
        console.log(values);
        onClose();
        onAlertOpen();
      }}
    >
      {({ setFieldValue, isSubmitting, errors, touched, values }) => (
        <Form>
          <DialogContent>
            <Container maxWidth="md" className="p-4">
              <Box className="mt-2">
                <Field
                  type="text"
                  name="taskTitle"
                  placeholder="Task Name"
                  as={TextField}
                  fullWidth
                  error={errors.taskTitle && touched.taskTitle ? true : false}
                  helperText={
                    errors.taskTitle && touched.taskTitle
                      ? errors.taskTitle
                      : ""
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

              <TaskButtonGroup
                scheduleValue={scheduleValue}
                setScheduleValue={setScheduleValue}
                setFieldValue={setFieldValue}
                values={values}
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
            onClose={onClose}
            scheduleValue={scheduleValue}
            setFieldValue={setFieldValue}
            isSubmitting={isSubmitting}
            submitButton={submitButton}
            currentTaskListChoice={currentTaskListChoice}
            defaultTaskListChoice={defaultTaskListChoice}
            tasklist={values.taskList}
          />
        </Form>
      )}
    </Formik>
  );
};

export default TaskForm;
