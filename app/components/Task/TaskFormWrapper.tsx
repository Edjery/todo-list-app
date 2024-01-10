"use client";

import { useTaskFormState } from "../../hooks/addTaskUseStateHandlers";
import AddTaskMiniButton from "../TaskHeader/AddTaskMiniButton";
import TaskHeader from "../TaskHeader/TaskHeader";

const TaskFormWrapper = () => {
  const { taskFormOpen, onTaskFormOpen, onTaskFormClose } = useTaskFormState();

  return (
    <>
      <TaskHeader
        taskFormOpen={taskFormOpen}
        onTaskFormOpen={onTaskFormOpen}
        onTaskFormClose={onTaskFormClose}
      />

      <AddTaskMiniButton onClick={onTaskFormOpen} />
    </>
  );
};

export default TaskFormWrapper;
