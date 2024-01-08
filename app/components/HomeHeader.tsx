"use client"; // Temporary

import { useTaskFormState } from "../hooks/addTaskUseStateHandlers";
import { Container, Toolbar } from "../lib/MUI-core-v4";
import AddTaskMiniButton from "./AddTaskMiniButton";
import FilterButton from "./FilterButton";
import SeachButton from "./SeachButton";
import AddTaskButton from "./TaskFormComponents/AddTaskButton";

const HomeHeader = () => {
  const { taskFormState, handleTaskFormState } = useTaskFormState();

  return (
    <Container maxWidth="md">
      <Toolbar className="flex justify-center mt-10 shadow-md rounded-full">
        <SeachButton />

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
