import { ToggleButton, ToggleButtonGroup } from "@material-ui/lab";
import { useState } from "react";
import todolistDummy from "../../data/todolist-dummy";
import {
  Box,
  Button,
  Container,
  Dialog,
  DialogContent,
  FormControl,
  Select,
} from "../../lib/MUI-core-v4";
import AddNewListModal from "./AddNewListModal";
import DateDialogBox from "./DateDialogBox";
import GroupTaskCheckBox from "./GroupTaskCheckBox";
import TaskFormText from "./TaskFormText";
import TaskFormTextArea from "./TaskFormTextArea";
import ToggleableButton from "../ToggleableButton";

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
  const { results: taskList } = todolistDummy;
  const [taskListChoice, setTaskListChoice] = useState<string | unknown>(
    "addNewList"
  );
  const [scheduleValue, setScheduleValue] = useState("Today");
  const [listFormState, setListFormState] = useState(false);

  const [chosenList, setChosenList] = useState<string | unknown>("");

  const intervals = ["Daily", "Monthly", "Weekly", "Monthly", "Yearly"];
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Sunday",
  ];

  const handleTaskListChoice = (
    event: React.ChangeEvent<{ value: string | unknown }>
  ) => {
    setTaskListChoice(event.target.value);
  };

  const handleScheduleValue = (
    event: React.MouseEvent<HTMLElement>,
    newValue: string | null
  ) => {
    if (newValue !== null) {
      setScheduleValue(newValue);
    }
  };

  const handleChosenList = (list: string | unknown) => {
    setChosenList(list);
  };

  const handleChosenTaskList = () => {
    handleChosenList(taskListChoice);
    if (scheduleValue === "Today") {
      handleChosenList(scheduleValue);
    } else if (scheduleValue === "Date") {
      handleChosenList("Unsorted");
    } else if (taskListChoice === "addNewList") {
      setListFormState(true);
      return;
    }
    handleTaskFormState();
    handleAlert();
  };

  return (
    <Dialog open={taskFormState} onClose={handleTaskFormState} maxWidth="lg">
      <DialogContent>
        <Container maxWidth="md" className="p-4">
          <TaskFormText placeholder="Task Name" />
          <TaskFormTextArea placeholder="Task Description (Optional)" />

          <Box component="div" className="flex justify-center my-5">
            <ToggleButtonGroup
              value={scheduleValue}
              exclusive
              onChange={handleScheduleValue}
            >
              <ToggleButton value="Today">Just Today</ToggleButton>
              <ToggleButton value="Date">
                <DateDialogBox />
              </ToggleButton>
              <ToggleButton value="Custom">Custom Schedule</ToggleButton>
            </ToggleButtonGroup>
            <ToggleableButton label={"Priority"} />
          </Box>

          {scheduleValue === "Custom" && (
            <Box>
              <GroupTaskCheckBox list={intervals} />
              <GroupTaskCheckBox list={days} />
            </Box>
          )}

          <TaskFormText placeholder="#Tags (Optional)" />
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
              onClick={handleChosenTaskList}
            >
              Add Task
            </Button>

            <AddNewListModal
              listFormState={listFormState}
              setListFormState={setListFormState}
              handleAlert={handleAlert}
              handleTaskFormState={handleTaskFormState}
            />
          </Box>
        </Box>
      </Box>
    </Dialog>
  );
};

export default AddTaskModal;
