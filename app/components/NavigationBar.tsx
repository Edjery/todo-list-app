"use client"; // Find a way to remove this later

import {
  AppBar,
  Container,
  IconButton,
  Toolbar,
  Typography,
} from "../lib/MUI-core-v4";
import MenuIcon from "@material-ui/icons/Menu";
import { useState } from "react";
import Sidebar from "./SideBarContents";

const NavigationBar = () => {
  const [open, setOpen] = useState(false);

  const openSideBar = () => {
    setOpen(true);
  };

  const closeSideBar = () => {
    setOpen(false);
  };

  return (
    <>
      <Container maxWidth="xl" className="bg-[#998767]">
        <Toolbar>
          <IconButton aria-label="open drawer" onClick={openSideBar}>
            <MenuIcon className="text-white" />
          </IconButton>
          <Typography variant="h6" className="text-white">
            TODOLIST
          </Typography>
        </Toolbar>
      </Container>
      <Sidebar open={open} handleDrawerClose={closeSideBar} />
    </>
  );
};

export default NavigationBar;
