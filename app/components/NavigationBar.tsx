"use client";

import { useState } from "react";
import { Container, Toolbar, Typography } from "../lib/MUI-core-v4";
import Sidebar from "./SideBarContents";

const NavigationBar = () => {
  const [open, setOpen] = useState(false);

  const onSidebarOpen = () => {
    setOpen(true);
  };

  const onSidebarClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Container maxWidth="xl" className="bg-[#998767]">
        <Toolbar>
          {/* <IconButton aria-label="open drawer" onClick={openSideBar}>
            <MenuIcon className="text-white" />
          </IconButton> */}
          <Typography variant="h6" className="text-white">
            TODOLIST
          </Typography>
        </Toolbar>
      </Container>
      <Sidebar open={open} onClose={onSidebarClose} />
    </>
  );
};

export default NavigationBar;
