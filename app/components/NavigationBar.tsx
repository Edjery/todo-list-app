"use client";

import { AppBar, IconButton, Toolbar, Typography } from "../lib/MUI-v4";
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
      <AppBar position="static">
        <Toolbar>
          <IconButton
            aria-label="open drawer"
            onClick={openSideBar}
            color="inherit"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6">TODOLIST</Typography>
        </Toolbar>
      </AppBar>
      <Sidebar open={open} handleDrawerClose={closeSideBar} />
    </>
  );
};

export default NavigationBar;
