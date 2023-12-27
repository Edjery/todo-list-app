"use client";
import React from "react";
import { Typography, Checkbox, Container } from "../lib/MUI-v4";
import EditIcon from "@material-ui/icons/Edit";

const TaskListCard = () => {
  return (
    <>
      <Typography>Today</Typography>

      <Container>
        <Checkbox defaultChecked inputProps={{ "aria-label": "Checkbox A" }} />
        <Typography>Check Email</Typography>
        <EditIcon />
      </Container>
    </>
  );
};

export default TaskListCard;
