"use client"; // Temporary

import AddCircleIcon from "@material-ui/icons/AddCircle";
import SearchIcon from "@material-ui/icons/Search";
import SortIcon from "@material-ui/icons/Sort";
import { ChangeEvent, useState } from "react";
import todolistDummy from "../data/todolist-dummy";
import {
  Box,
  Button,
  Container,
  Dialog,
  DialogContent,
  FormControl,
  IconButton,
  Select,
  Toolbar,
  Typography,
} from "../lib/MUI-core-v4";
import AddTaskForm from "./AddTaskForm";

const HomeHeader = () => {
  const [formOpen, setFormOpen] = useState(false);

  const handleChange = () => {
    setFormOpen(!formOpen);
  };

  const [state, setState] = useState<string | unknown>("");
  const { results: taskList } = todolistDummy;

  const handleChoices = (
    event: React.ChangeEvent<{ value: string | unknown }>
  ) => {
    setState(event.target.value);
  };

  return (
    <Container maxWidth="md">
      <Toolbar className="flex justify-center mt-10 shadow-md rounded-full">
        <IconButton>
          <SearchIcon />
        </IconButton>

        <Box className="mx-32">
          <IconButton color="primary" size="small" onClick={handleChange}>
            <Box className="flex px-5 bg-[#998767] rounded-full shadow-md py-1">
              <AddCircleIcon className="mr-3 text-white self-center" />
              <Typography
                variant="h6"
                className="text-white self-center inline"
              >
                Add Task
              </Typography>
            </Box>
          </IconButton>
          <Dialog open={formOpen} onClose={handleChange} maxWidth="lg">
            <DialogContent>
              <AddTaskForm />
            </DialogContent>
            <Box>
              <Box component="div" className="flex justify-between m-5">
                <Button variant="outlined" onClick={handleChange}>
                  Cancel
                </Button>
                <Box component="div" className="flex">
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
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleChange}
                  >
                    Add Task
                  </Button>
                </Box>
              </Box>
            </Box>
          </Dialog>
        </Box>

        <IconButton>
          <SortIcon />
        </IconButton>
      </Toolbar>
    </Container>
  );
};

export default HomeHeader;
