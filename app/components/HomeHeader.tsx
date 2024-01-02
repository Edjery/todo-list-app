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
import AddNewList from "./AddNewList";
import AddTaskMiniButton from "./AddTaskMiniButton";
import AddTaskModal from "./AddTaskModal";
import AddedNewTaskAlert from "./AddedNewTaskAlert";

const HomeHeader = () => {
  const [formOpen, setFormOpen] = useState<boolean>(false);
  const [list, setList] = useState<string | unknown>("addNewList");
  const [createdTask, setCreatedTask] = useState<string | unknown>();
  const [schedValue, setSchedValue] = useState<string>("Today");
  const [listForm, setListForm] = useState(false);

  const handleChange = () => {
    setFormOpen(!formOpen);
  };

  const handleChoices = (
    event: React.ChangeEvent<{ value: string | unknown }>
  ) => {
    setList(event.target.value);
  };

  const handleSchedValue = (
    event: React.MouseEvent<HTMLElement>,
    newValue: string | null
  ) => {
    if (newValue !== null) {
      setSchedValue(newValue);
    }
  };

  const handleCreateTask = () => {
    setCreatedTask(list);
    if (schedValue === "Today") {
      setCreatedTask(schedValue);
      setFormOpen(!formOpen);
    } else if (list === "addNewList") {
      setListForm(true);
      return;
    } else setFormOpen(!formOpen);
    setAlertOpen(!alertOpen);
  };

  const handleListFormConfirm = () => {
    setListForm(false);
    setFormOpen(!formOpen);
    setAlertOpen(!alertOpen);
  };
  const handleListFormCancel = () => {
    setListForm(false);
  };

  const [alertOpen, setAlertOpen] = useState(false);
  const handleAlert = () => {
    setAlertOpen(!alertOpen);
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
          <AddTaskModal
            formOpen={formOpen}
            handleChange={handleChange}
            list={list}
            handleChoices={handleChoices}
            handleCreateTask={handleCreateTask}
            schedValue={schedValue}
            handleSchedValue={handleSchedValue}
          />
          <AddNewList
            listForm={listForm}
            handleListFormConfirm={handleListFormConfirm}
            handleListFormCancel={handleListFormCancel}
          />

          <AddedNewTaskAlert alertOpen={alertOpen} handleAlert={handleAlert} />
        </Box>

        <IconButton>
          <SortIcon />
        </IconButton>
      </Toolbar>
      <AddTaskMiniButton handleChange={handleChange} />
    </Container>
  );
};

export default HomeHeader;
