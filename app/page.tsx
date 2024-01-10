"use client";

import { Box } from "@/app/lib/MUI-core-v4";
import AddTaskMiniButton from "./components/AddTaskMiniButton";
import SearchFormDialog from "./components/Header/Dialog/SearchFormDialog";
import TaskHeader from "./components/Header/TaskHeader";
import TaskFormDialog from "./components/Task/TaskFormDialog";
import TaskList from "./components/Task/TaskList";
import PopupAlert from "./components/Task/common/PopupAlert";
import {
  useAlertState,
  useSearchState,
  useTaskFormState,
  useTaskValue,
} from "./hooks/addTaskUseStateHandlers";

export default function Home() {
  const { taskFormOpen, onTaskFormOpen, onTaskFormClose } = useTaskFormState();
  const { searchOpen, onSearchOpen, onSearchClose } = useSearchState();
  const { alertOpen, onAlertOpen, onAlertClose } = useAlertState();
  const { task, onSelectTask } = useTaskValue();

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
