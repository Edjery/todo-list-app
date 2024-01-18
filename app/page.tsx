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

const taskListDataset = dummyTaskListData;
const taskDataset = dummyTaskData;
const timeIntervaDataset = dummyTimeInterval;
const dayIntervalDataset = dummyDayInterval;
const filterList = ["Default", "Date Created", "Name"];
const defualtFilterList = filterList[0];

export default function Home() {
  const [taskListData, setTaskListData] = useState(taskListDataset);
  const [taskData, setTaskData] = useState(taskDataset);
  const [timeIntervalData, setTimeIntervalData] = useState(timeIntervaDataset);
  const [dayIntervalData, setDayIntervalData] = useState(dayIntervalDataset);
  const [filterValue, setFilterValue] = useState<string>(defualtFilterList);

  console.log("taskData:", taskData);
  console.log("timeIntervalData:", timeIntervalData);
  console.log("dayIntervalData:", dayIntervalData);

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

  const searchedTaskData = taskData.filter((task) =>
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
          taskListData={taskListData}
          taskData={taskData}
          setTaskData={setTaskData}
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
        taskListData={taskListData}
        setTaskListData={setTaskListData}
        taskData={taskData}
        setTaskData={setTaskData}
        timeIntervalData={timeIntervalData}
        setTimeIntervalData={setTimeIntervalData}
        dayIntervalData={dayIntervalData}
        setDayIntervalData={setDayIntervalData}
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
