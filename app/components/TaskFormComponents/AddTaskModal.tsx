import {
  useCustomSchedule,
  useListForm,
  usePriority,
} from "@/app/hooks/uiControlHooks";
import {
  useChosenListAndHandlers,
  useListName,
  useScheduleValueAndHandlers,
  useTaskListChoice,
} from "@/app/hooks/useStateAndHandlers";
import { ToggleButton, ToggleButtonGroup } from "@material-ui/lab";
import todolistDummy from "../../data/todolist-dummy";
import {
  Box,
  Button,
  Container,
  Dialog,
  DialogContent,
  FormControl,
  Select,
  TextField,
  TextareaAutosize,
} from "../../lib/MUI-core-v4";
import ToggleableButton from "../ToggleableButton";
import AddDateModal from "./AddDateModal";
import AddNewListModal from "./AddNewListModal";
import GroupTaskCheckBox from "./GroupTaskCheckBox";

interface Props {
  taskFormState: boolean;
  handleTaskFormState: () => void;
  handleAlert: () => void;
}

const initialValues = {
  taskName: "",
  taskDescription: "",
  date: "",
  Priority: false,
  customScehdule: "",
  tags: "",
};

const AddTaskModal = ({
  taskFormState,
  handleTaskFormState,
  handleAlert,
}: Props) => {
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

  const { scheduleValue, handleScheduleValue } =
    useScheduleValueAndHandlers("Today");
  const { setChosenList } = useChosenListAndHandlers("");
  const { listFormState, showListForm, hideListForm } = useListForm(false);
  const { handleCheckedIntervals, handleCheckedDays } = useCustomSchedule();

  const { togglePriority } = usePriority(false);
  const { taskListChoice, handleTaskListChoice } =
    useTaskListChoice("addNewList");

  const { handleListName } = useListName("");

  const handleChosenList = () => {
    setChosenList(taskListChoice);
    if (scheduleValue === "Today") {
      setChosenList(scheduleValue);
    } else if (scheduleValue === "Date") {
      setChosenList("Unsorted");
    } else if (taskListChoice === "addNewList") {
      showListForm;
      return;
    }
    handleTaskFormState();
    handleAlert();
  };

  const listFormConfirm = () => {
    hideListForm();
    handleTaskFormState();
    handleAlert();
  };

  return (
    <Dialog open={taskFormState} onClose={handleTaskFormState} maxWidth="lg">
      <DialogContent>
        <Container maxWidth="md" className="p-4">
          <Box className="mt-2">
            <TextField placeholder="Task Name" fullWidth />
          </Box>
          <Box className="mt-2">
            <TextareaAutosize
              placeholder="Task Description (Optional)"
              className="size-full"
            />
          </Box>
          <Box component="div" className="flex justify-center my-5">
            <ToggleButtonGroup
              value={scheduleValue}
              exclusive
              onChange={handleScheduleValue}
            >
              <ToggleButton value="Today">Just Today</ToggleButton>
              <ToggleButton value="Date">
                <AddDateModal />
              </ToggleButton>
              <ToggleButton value="Custom">Custom Schedule</ToggleButton>
            </ToggleButtonGroup>
            <ToggleableButton label={"Priority"} onChange={togglePriority} />
          </Box>

          {scheduleValue === "Custom" && (
            <Box>
              <GroupTaskCheckBox
                list={intervals}
                onChange={handleCheckedIntervals}
              />
              <GroupTaskCheckBox list={days} onChange={handleCheckedDays} />
            </Box>
          )}
          <Box className="mt-2">
            <TextField placeholder="#Tags (Optional)" fullWidth />
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
              <Box>
                <Box className="mr-10">
                  <FormControl variant="outlined">
                    <Select
                      native
                      value={taskListChoice}
                      onChange={handleTaskListChoice}
                    >
                      <option value="addNewList">New List</option>
                      {taskList.map((taskListItem) => (
                        <option value={taskListItem.Title}>
                          {taskListItem.Title}
                        </option>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
              </Box>
            )}

            <Button
              variant="contained"
              color="primary"
              onClick={handleChosenList}
            >
              Add Task
            </Button>

            <AddNewListModal
              listFormState={listFormState}
              listFormConfirm={listFormConfirm}
              handleListName={handleListName}
              hideListForm={hideListForm}
            />
          </Box>
        </Box>
      </Box>
    </Dialog>
  );
};

export default AddTaskModal;
