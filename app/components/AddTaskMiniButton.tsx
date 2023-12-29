"use client";

import AddCircleIcon from "@material-ui/icons/AddCircle";
import { Box, IconButton } from "../lib/MUI-core-v4";

const AddTaskMiniButton = () => {
  return (
    <Box className="bottom-4 right-4 fixed">
      <IconButton>
        <AddCircleIcon className="text-[#998767]" fontSize="large" />
      </IconButton>
    </Box>
  );
};

export default AddTaskMiniButton;
