import {
  useCustomSchedule,
  useDueDate,
  usePriority,
  useScheduleValueAndHandlers,
  useTaskListChoice,
} from "@/app/hooks/useStateAndHandlers";
import { ToggleButton, ToggleButtonGroup } from "@material-ui/lab";
import { Field, Form, Formik } from "formik";
import todolistDummy from "../../data/todolist-dummy";
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
} from "../../lib/MUI-core-v4";
import ToggleableButton from "../ToggleableButton";
import AddDateModal from "./AddDateModal";
import GroupTaskCheckBox from "./GroupTaskCheckBox";
import addTaskSchema from "@/app/schemas/addTaskSchema";

const defaultScheduleValue = "Today";
const defaultPriorityValue = false;
const defaultTaskListChoice = "New List";

const initialValues = {
  taskTitle: undefined,
  taskDescription: undefined,
  schedule: defaultScheduleValue,
  dueDate: undefined,
  intervals: undefined,
  days: undefined,
  priority: defaultPriorityValue,
  taskList: undefined,
  tags: undefined,
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

interface Props {
  taskFormState: boolean;
  handleTaskFormState: () => void;
  handleAlert: () => void;
}

const AddTaskModal = ({
  taskFormState,
  handleTaskFormState,
  handleAlert,
}: Props) => {
  const { scheduleValue, setScheduleValue } =
    useScheduleValueAndHandlers(defaultScheduleValue);
  const { handleCheckedIntervals, handleCheckedDays } = useCustomSchedule();
  const { handleDueDate } = useDueDate();
  const { togglePriority } = usePriority(defaultPriorityValue);
  const { taskListChoice, handleTaskListChoice } = useTaskListChoice(
    defaultTaskListChoice
  );

  return (
    <Dialog open={taskFormState} onClose={handleTaskFormState} maxWidth="lg">
      <Formik
        initialValues={initialValues}
        validationSchema={addTaskSchema}
        onSubmit={(values) => {
          console.log(values);
          handleTaskFormState();
          handleAlert();
        }}
      >
        {({ setFieldValue, isSubmitting, errors, touched }) => (
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
                        setFieldValue("intervals", newValue);
                      }}
                    />
                    <GroupTaskCheckBox
                      list={days}
                      onChange={(items) => {
                        const newValue = handleCheckedDays(items);
                        setFieldValue("days", newValue);
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
                <Button variant="outlined" onClick={handleTaskFormState}>
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
                    Add Task
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

export default AddTaskModal;
