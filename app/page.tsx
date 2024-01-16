"use client";

import { Box } from "@/app/lib/MUI-core-v4";
import { useState } from "react";
import AddTaskMiniButton from "./components/AddTaskMiniButton";
import SearchFormDialog from "./components/Header/Dialog/SearchFormDialog";
import TaskHeader from "./components/Header/TaskHeader";
import TaskFormDialog from "./components/Task/TaskFormDialog";
import TaskList from "./components/Task/TaskList";
import PopupAlert from "./components/Task/common/PopupAlert";
import dummyTaskData from "./data/task-data";
import dummyTaskListData from "./data/taskList-data";
import dummyDayInterval from "./data/dayInterval-data";
import dummyTimeInterval from "./data/timeInterval-data";

const task_list_dataset = dummyTaskListData;
const task_dataset = dummyTaskData;
const timeInterval_dataset = dummyTimeInterval;
const dayInterval_dataset = dummyDayInterval;
const filterList = ["Default", "Date Created", "Name"];
const defualtFilterList = filterList[0];

export default function Home() {
  const [task_list_data, set_task_list_data] = useState(task_list_dataset);
  const [task_data, set_task_data] = useState(task_dataset);
  const [timeInterval_data, set_timeInterval_data] =
    useState(timeInterval_dataset);
  const [dayInterval_data, set_dayInterval_data] =
    useState(dayInterval_dataset);
  const [filterValue, setFilterValue] = useState<string>(defualtFilterList);

  console.log("task_data:", task_data);
  console.log("timeInterval_data:", timeInterval_data);
  console.log("dayInterval_data:", dayInterval_data);

  const [taskFormOpen, setTaskFormOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [taskId, setTaskId] = useState<string | undefined>(undefined);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleTaskFormOpen = (): void => {
    setTaskFormOpen(true);
  };
  const handleTaskFormClose = (): void => {
    setTaskFormOpen(false);
  };
  const handleSelectTask = (value: string | undefined): void => {
    setTaskId(value);
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setFilterValue("Search");
  };

  const searchedTaskData = task_data.filter((task) =>
    task.taskName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleFilterChange = (
    event: React.MouseEvent<HTMLElement>,
    newValue: string
  ): void => {
    setFilterValue(newValue);
  };

  return (
    <main>
      <Box>
        <TaskHeader
          onTaskFormOpen={() => {
            handleTaskFormOpen();
            handleSelectTask(undefined);
          }}
          onSearchOpen={() => setSearchOpen(true)}
          filterList={filterList}
          filterValue={filterValue}
          onFilterChange={handleFilterChange}
        />
        <TaskList
          searchedTaskData={searchedTaskData}
          filterValue={filterValue}
          task_list_data={task_list_data}
          task_data={task_data}
          set_task_data={set_task_data}
          onTaskFormOpen={handleTaskFormOpen}
          onSelectTask={handleSelectTask}
        />
        <AddTaskMiniButton
          onClick={() => {
            handleTaskFormOpen();
            handleSelectTask(undefined);
          }}
        />
      </Box>

      <SearchFormDialog
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
        onSearch={handleSearch}
      />
      <TaskFormDialog
        task_list_data={task_list_data}
        set_task_list_data={set_task_list_data}
        task_data={task_data}
        set_task_data={set_task_data}
        timeInterval_data={timeInterval_data}
        set_timeInterval_data={set_timeInterval_data}
        dayInterval_data={dayInterval_data}
        set_dayInterval_data={set_dayInterval_data}
        open={taskFormOpen}
        onAlertOpen={() => setAlertOpen(true)}
        onClose={handleTaskFormClose}
        taskId={taskId}
      />
      <PopupAlert
        open={alertOpen}
        onClose={() => setAlertOpen(false)}
        taskId={taskId}
      />
    </main>
  );
}
