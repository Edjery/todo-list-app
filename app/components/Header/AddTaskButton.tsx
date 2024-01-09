import { useAlertState } from "@/app/hooks/addTaskUseStateHandlers";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import { Box, IconButton, Typography } from "../../lib/MUI-core-v4";
import PopupAlert from "../common/PopupAlert";
import AddTaskModal from "../Task/AddTaskModal";

interface Props {
  taskFormOpen: boolean;
  onTaskFormOpen: () => void;
  onTaskFormClose: () => void;
}

const AddTaskButton = ({
  taskFormOpen,
  onTaskFormOpen,
  onTaskFormClose,
}: Props) => {
  const { alertOpen, onAlertOpen, onAlertClose } = useAlertState();

  return (
    <Box className="mx-32">
      <IconButton color="primary" size="small" onClick={onTaskFormOpen}>
        <Box className="flex px-5 bg-[#998767] rounded-full shadow-md py-1">
          <AddCircleIcon className="mr-3 text-white self-center" />
          <Typography variant="h6" className="text-white self-center inline">
            Add Task
          </Typography>
        </Box>
      </IconButton>

      <AddTaskModal
        taskFormOpen={taskFormOpen}
        onTaskFormClose={onTaskFormClose}
        onAlertOpen={onAlertOpen}
      />
      <PopupAlert
        alertMessage="Task has been successfully created"
        alertOpen={alertOpen}
        onAlertClose={onAlertClose}
      />
    </Box>
  );
};

export default AddTaskButton;
