"use client"; // Temporary

import SearchIcon from "@material-ui/icons/Search";
import SortIcon from "@material-ui/icons/Sort";
import { Container, IconButton, Toolbar } from "../lib/MUI-core-v4";
import AddTaskButton from "./TaskFormComponents/AddTaskButton";
import AddTaskMiniButton from "./AddTaskMiniButton";
import { useState } from "react";

const HomeHeader = () => {
  const [taskFormState, setTaskFormState] = useState(false);
  const handleTaskFormState = () => {
    setTaskFormState(!taskFormState);
  };

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
