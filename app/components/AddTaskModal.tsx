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

  list: string | unknown;
  handleChoices: (
    event: React.ChangeEvent<{ value: string | unknown }>
  ) => void;

  handleCreateTask: () => void;

  schedValue: string;
  handleSchedValue: (
    event: React.MouseEvent<HTMLElement>,
    newValue: string | null
  ) => void;
}

const AddTaskModal = ({
  formOpen,
  handleChange,
  list,
  handleChoices,
  handleCreateTask,
  schedValue,
  handleSchedValue,
}: Props) => {
  const { results: taskList } = todolistDummy;

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
                    <Select native value={list} onChange={handleChoices}>
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
              onClick={handleCreateTask}
            >
              Add Task
            </Button>
          </Box>
        </Box>
      </Box>
    </Dialog>
  );
};

export default AddTaskModal;
