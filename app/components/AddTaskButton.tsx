"use client";

import { Box, IconButton } from "../lib/MUI-v4";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import React from "react";

const AddTaskButton = () => {
  return (
    <Box className="bottom-4 right-4 fixed">
      <IconButton>
        <AddCircleIcon className="text-[#998767]" fontSize="large" />
      </IconButton>
    </Box>
  );
};

export default AddTaskButton;
