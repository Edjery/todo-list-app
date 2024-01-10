import {
  useAlertState,
  useSearchState,
} from "@/app/hooks/addTaskUseStateHandlers";
import { Box, Container, Toolbar } from "../../lib/MUI-core-v4";
import PopupAlert from "../common/PopupAlert";
import AddTaskButton from "./AddTaskButton";
import TaskFormDialog from "./Dialog/TaskFormDialog";
import SearchFormDialog from "./Dialog/searchFormDialog";
import FilterButton from "./FilterButton";
import SearchButton from "./SearchButton";

interface Props {
  taskFormOpen: boolean;
  onTaskFormOpen: () => void;
  onTaskFormClose: () => void;
}

const TaskHeader = ({
  taskFormOpen,
  onTaskFormOpen,
  onTaskFormClose,
}: Props) => {
  const { alertOpen, onAlertOpen, onAlertClose } = useAlertState();
  const { searchOpen, onSearchOpen, onSearchClose } = useSearchState();

  return (
    <Container maxWidth="md">
      <Toolbar className="flex justify-center mt-10 shadow-md rounded-full">
        <Box>
          <SearchButton onClick={onSearchOpen} />
          <SearchFormDialog open={searchOpen} onClose={onSearchClose} />
        </Box>

        <Box className="mx-32">
          <AddTaskButton onClick={onTaskFormOpen} />
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

        <Box>
          <FilterButton />
        </Box>
      </Toolbar>
    </Container>
  );
};

export default TaskHeader;
