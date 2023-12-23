"use client"; // Temporary

import AddCircleIcon from "@material-ui/icons/AddCircle";
import SearchIcon from "@material-ui/icons/Search";
import SortIcon from "@material-ui/icons/Sort";
import { Box, Button, Container, IconButton, Typography } from "../lib/MUI-v4";

const HomeHeader = () => {
  return (
    <Container className="text-center mt-10">
      <Box className="mr-40 inline-block">
        <IconButton>
          <SearchIcon />
        </IconButton>
      </Box>

      <Box
        className="mr-40 px-5 bg-[#998767] inline-block rounded-full"
        boxShadow={5}
      >
        <Button>
          <AddCircleIcon className="mr-5 text-white" />
          <Typography variant="h5" className="text-white normal-case">
            Add Task
          </Typography>
        </Button>
      </Box>

      <Box className="inline-block">
        <IconButton>
          <SortIcon />
        </IconButton>
      </Box>
    </Container>
  );
};

export default HomeHeader;
