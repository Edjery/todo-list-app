"use client"; // Temporary

import AddCircleIcon from "@material-ui/icons/AddCircle";
import SearchIcon from "@material-ui/icons/Search";
import SortIcon from "@material-ui/icons/Sort";
import { useState } from "react";
import {
  Box,
  Container,
  IconButton,
  Toolbar,
  Typography,
} from "../lib/MUI-core-v4";
import AddTaskModal from "./AddTaskModal";

const HomeHeader = () => {
  const [formOpen, setFormOpen] = useState<boolean>(false);

  const handleChange = () => {
    setFormOpen(!formOpen);
  };

  return (
    <Container maxWidth="md">
      <Toolbar className="flex justify-center mt-10 shadow-md rounded-full">
        <IconButton>
          <SearchIcon />
        </IconButton>

        <Box className="mx-32">
          <IconButton color="primary" size="small" onClick={handleChange}>
            <Box className="flex px-5 bg-[#998767] rounded-full shadow-md py-1">
              <AddCircleIcon className="mr-3 text-white self-center" />
              <Typography
                variant="h6"
                className="text-white self-center inline"
              >
                Add Task
              </Typography>
            </Box>
          </IconButton>
          <AddTaskModal formOpen={formOpen} handleChange={handleChange} />
        </Box>

        <IconButton>
          <SortIcon />
        </IconButton>
      </Toolbar>
    </Container>
  );
};

export default HomeHeader;
