"use client";

import { Box } from "@/app/lib/MUI-core-v4";
import { useState } from "react";
import AddTaskMiniButton from "./components/AddTaskMiniButton";
import SearchFormDialog from "./components/Header/Dialog/SearchFormDialog";
import TaskHeader from "./components/Header/TaskHeader";
import ITaskIndex from "./components/Task/ITaskIndex";
import TaskFormDialog from "./components/Task/TaskFormDialog";
import TaskList from "./components/Task/TaskList";
import PopupAlert from "./components/Task/common/PopupAlert";

export default function Home() {
  const [taskFormOpen, setTaskFormOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [task, setTask] = useState<ITaskIndex | undefined>(undefined);

  const handleTaskFormOpen = (): void => {
    setTaskFormOpen(true);
  };
  const HandleTaskFormClose = (): void => {
    setTaskFormOpen(false);
  };
  const handleSelectTask = (value: ITaskIndex | undefined): void => {
    setTask(value);
  };

  return (
    <main>
      <Box>
        <TaskHeader
          onTaskFormOpen={() => {
            handleTaskFormOpen();
            handleSelectTask(undefined);
          }}
          onSearchOpen={() => setSearchOpen(true)}
        />
        <TaskList
          onTaskFormOpen={handleTaskFormOpen}
          onSelectTask={handleSelectTask}
        />
        <AddTaskMiniButton
          onClick={() => {
            handleTaskFormOpen();
            handleSelectTask(undefined);
          }}
        />
      </Box>

      <SearchFormDialog
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
      />
      <TaskFormDialog
        open={taskFormOpen}
        onAlertOpen={() => setAlertOpen(true)}
        onClose={HandleTaskFormClose}
        task={task}
      />
      <PopupAlert
        open={alertOpen}
        onClose={() => setAlertOpen(false)}
        task={task}
      />
    </main>
  );
}
