import {
  useCustomSchedule,
  useDueDate,
  usePriority,
  useScheduleValueAndHandlers,
  useTaskListChoice,
} from "@/app/hooks/addTaskUseStateHandlers";
import addTaskSchema from "@/app/schemas/addTaskSchema";
import { ToggleButton, ToggleButtonGroup } from "@material-ui/lab";
import { Field, Form, Formik } from "formik";
import { useEffect } from "react";
import todolistDummy from "../data/todolist-dummy";
import {
  Box,
  Button,
  Container,
  Dialog,
  DialogContent,
  FormControl,
  MenuItem,
  Select,
  TextField,
  TextareaAutosize,
} from "../lib/MUI-core-v4";
import AddDateModal from "./TaskFormComponents/AddDateModal";
import GroupTaskCheckBox from "./TaskFormComponents/GroupTaskCheckBox";
import ToggleableButton from "./ToggleableButton";

const defaultScheduleValue = "Today";
const defaultPriorityValue = false;
const defaultTaskListChoice = "New List";

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
  taskId: "",
};

const { results: taskList } = todolistDummy;
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
  editState: boolean;
  handleEditState: () => void;
  handleAlertState: () => void;
  taskId?: { taskId: number; taskListId: number };
}

const EditTaskModal = ({
  editState,
  handleEditState,
  handleAlertState,
  taskId,
}: Props) => {
  const { scheduleValue, setScheduleValue } =
    useScheduleValueAndHandlers(defaultScheduleValue);
  const { handleCheckedIntervals, handleCheckedDays } = useCustomSchedule();
  const { handleDueDate } = useDueDate();
  const { togglePriority } = usePriority(defaultPriorityValue);
  const { taskListChoice, setTaskListChoice, handleTaskListChoice } =
    useTaskListChoice(defaultTaskListChoice);

  useEffect(() => {
    if (taskId) {
      initialValues.taskTitle =
        todolistDummy.results[taskId.taskListId].Tasks[taskId.taskId].taskTitle;
      const item = todolistDummy.results[taskId.taskListId].Title;
      initialValues.taskList = item;
      setTaskListChoice(item);
    }
  }, [setTaskListChoice, taskId]);

  return (
    <Dialog open={editState} onClose={handleEditState} maxWidth="lg">
      <Formik
        initialValues={initialValues}
        validationSchema={addTaskSchema}
        onSubmit={(values) => {
          console.log(values);
          handleEditState();
          handleAlertState();
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
                    fullWidth
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
                        setFieldValue("schedule", newValue);
                        setScheduleValue(newValue);
                      }
                    }}
                  >
                    <ToggleButton value="Today">Just Today</ToggleButton>
                    <ToggleButton value="Date">
                      <AddDateModal
                        onChange={(value) => {
                          const newValue = handleDueDate(value);
                          setFieldValue("date", newValue);
                        }}
                      />
                    </ToggleButton>
                    <ToggleButton value="Custom">Custom Schedule</ToggleButton>
                  </ToggleButtonGroup>
                  <ToggleableButton
                    label={"Priority"}
                    onChange={() => {
                      const newValue = togglePriority();
                      setFieldValue("priority", newValue);
                    }}
                  />
                </Box>

                {scheduleValue === "Custom" && (
                  <Box>
                    <GroupTaskCheckBox
                      list={intervals}
                      onChange={(items) => {
                        const newValue = handleCheckedIntervals(items);
                        const recurringTimeInterval = changeObjectValue(
                          newValue,
                          values.RecurringTimeInterval
                        );
                        setFieldValue(
                          "RecurringTimeInterval",
                          recurringTimeInterval
                        );
                      }}
                    />
                    <GroupTaskCheckBox
                      list={days}
                      onChange={(items) => {
                        const newValue = handleCheckedDays(items);
                        const daysOfTheWeek = changeObjectValue(
                          newValue,
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
                    fullWidth
                  />
                </Box>
              </Container>
            </DialogContent>

            <Box>
              <Box component="div" className="flex justify-between m-5">
                <Button variant="outlined" onClick={handleEditState}>
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
                            fullWidth
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
                    Edit Task
                  </Button>
                </Box>
              </Box>
            </Box>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
};

export default EditTaskModal;
