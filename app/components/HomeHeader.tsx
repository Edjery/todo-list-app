"use client"; // Temporary

import SearchIcon from "@material-ui/icons/Search";
import SortIcon from "@material-ui/icons/Sort";
import { useTaskFormState } from "../hooks/addTaskUseStateHandlers";
import { Container, IconButton, Toolbar } from "../lib/MUI-core-v4";
import AddTaskMiniButton from "./AddTaskMiniButton";
import AddTaskButton from "./TaskFormComponents/AddTaskButton";

const HomeHeader = () => {
  const { taskFormState, handleTaskFormState } = useTaskFormState();

  return (
    <Container maxWidth="md">
      <Toolbar className="flex justify-center mt-10 shadow-md rounded-full">
        <IconButton>
          <SearchIcon />
        </IconButton>

        <AddTaskButton
          taskFormState={taskFormState}
          handleTaskFormState={handleTaskFormState}
        />

        <IconButton>
          <SortIcon />
        </IconButton>
      </Toolbar>
      <AddTaskMiniButton handleTaskFormState={handleTaskFormState} />
    </Container>
  );
};

export default HomeHeader;
