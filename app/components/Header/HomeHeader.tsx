"use client";

import { useTaskFormState } from "../../hooks/addTaskUseStateHandlers";
import { Container, Toolbar } from "../../lib/MUI-core-v4";
import AddTaskMiniButton from "./AddTaskMiniButton";
import FilterButton from "./FilterButton";
import SearchButton from "./SearchButton";
import AddTaskButton from "./AddTaskButton";

const HomeHeader = () => {
  const { taskFormOpen, onTaskFormOpen, onTaskFormClose } = useTaskFormState();

  return (
    <Container maxWidth="md">
      <Toolbar className="flex justify-center mt-10 shadow-md rounded-full">
        <SearchButton />

        <AddTaskButton
          taskFormOpen={taskFormOpen}
          onTaskFormOpen={onTaskFormOpen}
          onTaskFormClose={onTaskFormClose}
        />

        <FilterButton />
      </Toolbar>
      <AddTaskMiniButton onTaskFormOpen={onTaskFormOpen} />
    </Container>
  );
};

export default HomeHeader;
