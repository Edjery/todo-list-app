import AddCircleIcon from "@material-ui/icons/AddCircle";
import { Box, IconButton, Typography } from "../../lib/MUI-core-v4";

interface Props {
  onTaskFormOpen: () => void;
}

const AddTaskButton = ({ onTaskFormOpen }: Props) => {
  return (
    <IconButton color="primary" size="small" onClick={onTaskFormOpen}>
      <Box className="flex px-5 bg-[#998767] rounded-full shadow-md py-1">
        <AddCircleIcon className="mr-3 text-white self-center" />
        <Typography variant="h6" className="text-white self-center inline">
          Add Task
        </Typography>
      </Box>
    </IconButton>
  );
};

export default AddTaskButton;
