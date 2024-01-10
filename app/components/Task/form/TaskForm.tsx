import todolistDummy from "@/app/data/todolist-dummy";
import {
  Box,
  Button,
  Container,
  DialogContent,
  FormControl,
  MenuItem,
  Select,
  TextField,
  TextareaAutosize,
} from "@/app/lib/MUI-core-v4";
import { ToggleButton, ToggleButtonGroup } from "@/app/lib/MUI-lab-v4";
import addTaskSchema from "@/app/schemas/addTaskSchema";
import { Field, Form, Formik } from "formik";
import React, { ChangeEvent, useEffect, useState } from "react";
import ToggleableButton from "../../common/ToggleableButton";
import DueDateDialog from "../common/DueDateDialog";
import TaskCheckboxGroup from "../common/TaskCheckboxGroup";
import ITask from "../ITask";

const defaultScheduleValue = "Today";
const defaultPriorityValue = false;
const defaultTaskListChoice = "New List";
const { results: taskList } = todolistDummy;

const initialValues = {
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

const intervals = ["Daily", "Weekly", "Monthly", "Yearly"];
const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const changeObjectValue = (
  newValue: string[],
  prevValue: { choice: string; status: boolean }[]
) => {
  for (let object of prevValue) {
    for (let index in newValue) {
      if (object.choice === newValue[index]) {
        object.status = true;
      }
    }
  }
  return prevValue;
};

interface Props {
  onAlertOpen: () => void;
  onClose: () => void;
  task?: ITask | undefined;
}

const TaskForm = ({ onAlertOpen, onClose, task }: Props) => {
  const [scheduleValue, setScheduleValue] =
    useState<string>(defaultScheduleValue);
  const [taskListChoice, setTaskListChoice] = useState<string | unknown>(
    defaultTaskListChoice
  );

  const handleTaskListChoice = (
    event: ChangeEvent<{ value: string | unknown }>
  ) => {
    const newValue = event.target.value;
    setTaskListChoice(newValue);
    return newValue;
  };

  useEffect(() => {
    if (task === undefined) {
      initialValues.taskTitle = "";
      initialValues.taskList = "";
      setTaskListChoice(defaultTaskListChoice);
    } else {
      initialValues.taskTitle =
        todolistDummy.results[task.taskListIndex].Tasks[
          task.taskIndex
        ].taskName;
      initialValues.taskList = todolistDummy.results[task.taskListIndex].Title;
      setTaskListChoice(initialValues.taskList);
    }
  }, [setTaskListChoice, task]);
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
              <Box component="div" className="flex justify-center my-5">
                <ToggleButtonGroup
                  value={scheduleValue}
                  exclusive
                  onChange={(
                    event: React.MouseEvent<HTMLElement>,
                    newValue: string | null
                  ) => {
                    if (newValue !== null) {
                      setScheduleValue(newValue);
                      setFieldValue("schedule", newValue);
                    }
                  }}
                >
                  <ToggleButton value="Today">Just Today</ToggleButton>
                  <ToggleButton value="Date">
                    <DueDateDialog
                      value={values.dueDate}
                      onChange={(value) => {
                        setFieldValue("date", value);
                      }}
                    />
                  </ToggleButton>
                  <ToggleButton value="Custom">Custom Schedule</ToggleButton>
                </ToggleButtonGroup>
                <ToggleableButton
                  value={values.priority}
                  label={"Priority"}
                  onChange={(item) => {
                    setFieldValue("priority", item);
                  }}
                />
              </Box>

              {scheduleValue === "Custom" && (
                <Box>
                  <TaskCheckboxGroup
                    value={values.RecurringTimeInterval}
                    list={intervals}
                    onChange={(items) => {
                      const recurringTimeInterval = changeObjectValue(
                        items,
                        values.RecurringTimeInterval
                      );
                      setFieldValue(
                        "RecurringTimeInterval",
                        recurringTimeInterval
                      );
                    }}
                  />
                  <TaskCheckboxGroup
                    value={values.RecurringTimeInterval}
                    list={days}
                    onChange={(items) => {
                      const daysOfTheWeek = changeObjectValue(
                        items,
                        values.DaysOfTheWeek
                      );
                      setFieldValue("DaysOfTheWeek", daysOfTheWeek);
                    }}
                  />
                </Box>
              )}
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

          <Box>
            <Box component="div" className="flex justify-between m-5">
              <Button variant="outlined" onClick={onClose}>
                Cancel
              </Button>

              <Box component="div" className="flex">
                {scheduleValue === "Custom" && (
                  <>
                    <Box className="mx-5 self-center">
                      {taskListChoice === defaultTaskListChoice && (
                        <Field
                          type="text"
                          name="taskList"
                          placeholder="list name"
                          as={TextField}
                        />
                      )}
                    </Box>
                    <Box className="mr-5">
                      <FormControl variant="outlined">
                        <Select
                          value={taskListChoice}
                          onChange={(items) => {
                            const newValue = handleTaskListChoice(items);
                            setFieldValue("taskList", newValue);
                          }}
                        >
                          <MenuItem
                            key={defaultTaskListChoice}
                            value={defaultTaskListChoice}
                          >
                            New List
                          </MenuItem>
                          {taskList.map((taskListItem) => (
                            <MenuItem
                              key={taskListItem.Title}
                              value={taskListItem.Title}
                            >
                              {taskListItem.Title}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Box>
                  </>
                )}

                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={isSubmitting}
                >
                  {submitButton}
                </Button>
              </Box>
            </Box>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default TaskForm;
