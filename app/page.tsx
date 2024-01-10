"use client";

import { Box } from "@/app/lib/MUI-core-v4";
import AddTaskMiniButton from "./components/AddTaskMiniButton";
import SearchFormDialog from "./components/Header/Dialog/SearchFormDialog";
import TaskFormDialog from "./components/Header/Dialog/TaskFormDialog";
import TaskHeader from "./components/Header/TaskHeader";
import TaskList from "./components/TaskList";
import PopupAlert from "./components/common/PopupAlert";
import {
  useSearchState,
  useTaskFormState,
  useAlertState,
} from "./hooks/addTaskUseStateHandlers";

export default function Home() {
  const { searchOpen, onSearchOpen, onSearchClose } = useSearchState();
  const { taskFormOpen, onTaskFormOpen, onTaskFormClose } = useTaskFormState();
  const { alertOpen, onAlertOpen, onAlertClose } = useAlertState();

  return (
    <main>
      <TaskHeader onTaskFormOpen={onTaskFormOpen} onSearchOpen={onSearchOpen} />
      <TaskList />
      <AddTaskMiniButton onClick={onTaskFormOpen} />

      <Box>
        <SearchFormDialog open={searchOpen} onClose={onSearchClose} />

        <TaskFormDialog
          formOpen={taskFormOpen}
          onAlertOpen={onAlertOpen}
          onFormClose={onTaskFormClose}
        />

        <PopupAlert
          message="Task has been successfully created"
          open={alertOpen}
          onClose={onAlertClose}
        />
      </Box>
    </main>
  );
}
