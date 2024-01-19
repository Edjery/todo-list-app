"use client";

import { Box } from "@/app/lib/MUI-core-v4";
import { useState } from "react";
import AddTaskMiniButton from "./components/AddTaskMiniButton";
import SearchFormDialog from "./components/Header/Dialog/SearchFormDialog";
import TaskHeader from "./components/Header/TaskHeader";
import TaskFormDialog from "./components/Task/TaskFormDialog";
import TaskList from "./components/Task/TaskList";
import PopupAlert from "./components/Task/common/PopupAlert";
import { sortList } from "./data/dataMatrix";
import dummyDayInterval, { IDayInterval } from "./data/dayIntervalData";
import dummyTaskData, { ITaskData } from "./data/taskData";
import dummyTaskListData, { ITaskListData } from "./data/taskListData";
import dummyTimeInterval, { ITimeInterval } from "./data/timeIntervalData";

const taskListDataset = dummyTaskListData;
const taskDataset = dummyTaskData;
const timeIntervaDataset = dummyTimeInterval;
const dayIntervalDataset = dummyDayInterval;
const defualtSortList = sortList[0];

export default function Home() {
  const [taskListData, setTaskListData] = useState(taskListDataset);
  const [taskData, setTaskData] = useState(taskDataset);
  const [timeIntervalData, setTimeIntervalData] = useState(timeIntervaDataset);
  const [dayIntervalData, setDayIntervalData] = useState(dayIntervalDataset);
  const [sortValue, setSortValue] = useState<string>(defualtSortList);

  console.log("taskData:", taskData);
  console.log("timeIntervalData:", timeIntervalData);
  console.log("dayIntervalData:", dayIntervalData);

  const [taskFormOpen, setTaskFormOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [taskId, setTaskId] = useState<string | undefined>(undefined);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const searchedTaskData = taskData.filter((task) =>
    task.taskName.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
    setSortValue("Search");
  };

  const handleTaskDataChange = (value: ITaskData[]) => {
    setTaskData(value);
  };

  const handleTaskListDataChange = (value: ITaskListData[]) => {
    setTaskListData(value);
  };

  const handleTimeIntervalDataChange = (value: ITimeInterval[]) => {
    setTimeIntervalData(value);
  };

  const handleDayIntervalDataChange = (value: IDayInterval[]) => {
    setDayIntervalData(value);
  };

  const getSortedTaskData = () => {
    const sortedTaskData = searchedTaskData.sort((a, b) => {
      if (sortValue === "Default") {
        const dateA = new Date(a.dateCreated);
        const dateB = new Date(b.dateCreated);
        return dateB.getTime() - dateA.getTime();
      } else if (sortValue === "Date Created") {
        const dateA = new Date(a.dateCreated);
        const dateB = new Date(b.dateCreated);
        return dateA.getTime() - dateB.getTime();
      } else if (sortValue === "Name") {
        return a.taskName.localeCompare(b.taskName);
      }
      return 0;
    });
    return sortedTaskData;
  };

  const handleTaskCheckboxChange = (taskId: string): void => {
    const updatedTaskData = taskData.map((task) => {
      if (task.taskId === taskId) {
        return {
          ...task,
          status: !task.status,
        };
      }
      return task;
    });
    handleTaskDataChange(updatedTaskData);
  };

  const handleSortChange = (
    event: React.MouseEvent<HTMLElement>,
    newValue: string
  ): void => {
    setSortValue(newValue);
  };

  const handleEditTaskData = (taskId: string): void => {
    handleSelectTask(taskId);
    handleTaskFormOpen();
  };

  return (
    <main>
      <Box>
        <TaskHeader
          onSearchOpen={() => setSearchOpen(true)}
          onTaskFormOpen={() => {
            handleSelectTask(undefined);
            handleTaskFormOpen();
          }}
          sortValue={sortValue}
          onSortChange={handleSortChange}
        />
        <TaskList
          taskListData={taskListData}
          displayedTaskData={getSortedTaskData()}
          onTaskDataChange={handleTaskDataChange}
          onTaskCheckboxChange={handleTaskCheckboxChange}
          onEditTaskData={handleEditTaskData}
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
        onTaskListDataChange={handleTaskListDataChange}
        taskData={taskData}
        onTaskDataChange={handleTaskDataChange}
        timeIntervalData={timeIntervalData}
        onTimeIntervalDataChange={handleTimeIntervalDataChange}
        dayIntervalData={dayIntervalData}
        onDayIntervalDataChange={handleDayIntervalDataChange}
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
