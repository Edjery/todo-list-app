import AddCircleIcon from "@material-ui/icons/AddCircle";
import { Box, IconButton, Typography } from "../../lib/MUI-core-v4";
import AddTaskModal from "./AddTaskModal";
import PopupAlert from "../PopupAlert";
import { useState } from "react";

interface Props {
  taskFormState: boolean;
  handleTaskFormState: () => void;
}

const AddTaskButton = ({ taskFormState, handleTaskFormState }: Props) => {
  const [alertState, setAlertState] = useState(false);
  const handleAlert = () => {
    setAlertState(!alertState);
  };
  return (
    <Box className="mx-32">
      <IconButton color="primary" size="small" onClick={handleTaskFormState}>
        <Box className="flex px-5 bg-[#998767] rounded-full shadow-md py-1">
          <AddCircleIcon className="mr-3 text-white self-center" />
          <Typography variant="h6" className="text-white self-center inline">
            Add Task
          </Typography>
        </Box>
      </IconButton>
      <AddTaskModal
        taskFormState={taskFormState}
        handleTaskFormState={handleTaskFormState}
        handleAlert={handleAlert}
      />
      <PopupAlert
        alertMessage="Task has been successfully created"
        alertState={alertState}
        handleAlert={handleAlert}
      />
    </Box>
  );
};

export default AddTaskButton;
