"use client"; // Temporary

import SearchIcon from "@material-ui/icons/Search";
import {
  useFilterModalState,
  useTaskFormState,
} from "../hooks/addTaskUseStateHandlers";
import { Container, IconButton, Toolbar } from "../lib/MUI-core-v4";
import AddTaskMiniButton from "./AddTaskMiniButton";
import AddTaskButton from "./TaskFormComponents/AddTaskButton";
import FilterButton from "./FilterButton";

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

        <FilterButton />
      </Toolbar>
      <AddTaskMiniButton handleTaskFormState={handleTaskFormState} />
    </Container>
  );
};

export default HomeHeader;
