"use client";

import AddTaskMiniButton from "./components/TaskHeader/AddTaskMiniButton";
import TaskHeader from "./components/TaskHeader/TaskHeader";
import TaskList from "./components/TaskList";
import { useTaskFormState } from "./hooks/addTaskUseStateHandlers";

export default function Home() {
  const { taskFormOpen, onTaskFormOpen, onTaskFormClose } = useTaskFormState();

  return (
    <main>
      <TaskHeader
        taskFormOpen={taskFormOpen}
        onTaskFormOpen={onTaskFormOpen}
        onTaskFormClose={onTaskFormClose}
      />
      <TaskList />
      <AddTaskMiniButton onClick={onTaskFormOpen} />
    </main>
  );
}
