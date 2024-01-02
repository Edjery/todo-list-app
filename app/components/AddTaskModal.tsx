import { useState } from "react";
import todolistDummy from "../data/todolist-dummy";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  FormControl,
  Select,
} from "../lib/MUI-core-v4";
import TaskForm from "./TaskForm";

interface Props {
  formOpen: boolean;
  handleChange: () => void;
}

const AddTaskModal = ({ formOpen, handleChange }: Props) => {
  const [state, setState] = useState<string | unknown>("");
  const { results: taskList } = todolistDummy;

  const handleChoices = (
    event: React.ChangeEvent<{ value: string | unknown }>
  ) => {
    setState(event.target.value);
  };

  const [schedValue, setSchedValue] = useState<string>("Today");

  const handleSchedValue = (
    event: React.MouseEvent<HTMLElement>,
    newValue: string | null
  ) => {
    if (newValue !== null) {
      setSchedValue(newValue);
    }
  };

  return (
    <Dialog open={formOpen} onClose={handleChange} maxWidth="lg">
      <DialogContent>
        <TaskForm schedValue={schedValue} handleSchedValue={handleSchedValue} />
      </DialogContent>
      <Box>
        <Box component="div" className="flex justify-between m-5">
          <Button variant="outlined" onClick={handleChange}>
            Cancel
          </Button>
          <Box component="div" className="flex">
            {schedValue === "Custom" && (
              <Box>
                <Box className="mr-10">
                  <FormControl variant="outlined">
                    <Select native value={state} onChange={handleChoices}>
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

            <Button variant="contained" color="primary" onClick={handleChange}>
              Add Task
            </Button>
          </Box>
        </Box>
      </Box>
    </Dialog>
  );
};

export default AddTaskModal;
