"use client";

import { Box } from "@/app/lib/MUI-core-v4";
import { useState } from "react";
import AddTaskMiniButton from "./components/AddTaskMiniButton";
import SearchFormDialog from "./components/Header/Dialog/SearchFormDialog";
import TaskHeader from "./components/Header/TaskHeader";
import TaskFormDialog from "./components/Task/TaskFormDialog";
import TaskList from "./components/Task/TaskList";
import PopupAlert from "./components/Task/common/PopupAlert";
import ITask from "./components/Task/ITask";

export default function Home() {
  const [taskFormOpen, setTaskFormOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);

  const [task, setTask] = useState<ITask | undefined>(undefined);

  const onTaskFormOpen = () => {
    setTaskFormOpen(true);
  };
  const onTaskFormClose = () => {
    setTaskFormOpen(false);
  };

  const onSearchOpen = () => {
    setSearchOpen(true);
  };
  const onSearchClose = () => {
    setSearchOpen(false);
  };

  const onAlertOpen = () => {
    setAlertOpen(true);
  };
  const onAlertClose = () => {
    setAlertOpen(false);
  };

  const onSelectTask = (value: ITask | undefined) => {
    setTask(value);
  };

  return (
    <main>
      <Box>
        <TaskHeader
          onTaskFormOpen={onTaskFormOpen}
          onSearchOpen={onSearchOpen}
          onSelectTask={onSelectTask}
        />
        <TaskList onTaskFormOpen={onTaskFormOpen} onSelectTask={onSelectTask} />
        <AddTaskMiniButton onClick={onTaskFormOpen} />
      </Box>

      <Box>
        <SearchFormDialog open={searchOpen} onClose={onSearchClose} />

        <TaskFormDialog
          formOpen={taskFormOpen}
          onAlertOpen={onAlertOpen}
          onFormClose={onTaskFormClose}
          task={task}
        />

        <PopupAlert open={alertOpen} onClose={onAlertClose} task={task} />
      </Box>
    </main>
  );
}
