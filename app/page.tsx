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

  // handle forms
  const handleTaskFormOpen = (): void => {
    setTaskFormOpen(true);
  };
  const handleTaskFormClose = (): void => {
    setTaskFormOpen(false);
  };

  // handle tasks
  const handleAddTaskData = (): void => {
    setTaskId(undefined);
    handleTaskFormOpen();
  };

  const handleEditTaskData = (taskId: string): void => {
    setTaskId(taskId);
    handleTaskFormOpen();
  };

  const handleDeleteTaskData = (taskId: string): void => {
    const updatedTaskData = taskData.filter((task) => task.taskId !== taskId);
    setTaskData(updatedTaskData);
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
    setTaskData(updatedTaskData);
  };

  return (
    <main>
      <Box>
        <TaskHeader
          onSearchOpen={(): void => setSearchOpen(true)}
          onTaskFormOpen={handleAddTaskData}
          sortValue={sortValue}
          onSortChange={(
            event: React.MouseEvent<HTMLElement>,
            newSortValue: string
          ): void => {
            setSortValue(newSortValue);
          }}
        />
        <TaskList
          taskListData={taskListData}
          displayedTaskData={getSortedTaskData()}
          onTaskCheckboxChange={handleTaskCheckboxChange}
          onEditTaskData={handleEditTaskData}
          onDeleteTaskData={handleDeleteTaskData}
        />
        <AddTaskMiniButton onClick={handleAddTaskData} />
      </Box>

      <SearchFormDialog
        open={searchOpen}
        onClose={(): void => setSearchOpen(false)}
        onSearch={(newSearchTerm: string): void => {
          setSortValue("Search");
          setSearchTerm(newSearchTerm);
        }}
      />
      <TaskFormDialog
        taskListData={taskListData}
        onUpdateTaskListData={(newTaskListValue: ITaskListData[]): void =>
          setTaskListData(newTaskListValue)
        }
        taskData={taskData}
        onUpdateTaskData={(newTaskDataValue: ITaskData[]): void =>
          setTaskData(newTaskDataValue)
        }
        timeIntervalData={timeIntervalData}
        onUpdateTimeIntervalData={(
          newTimeIntervalValue: ITimeInterval[]
        ): void => setTimeIntervalData(newTimeIntervalValue)}
        dayIntervalData={dayIntervalData}
        onUpdateDayIntervalData={(newDayIntervalValue: IDayInterval[]): void =>
          setDayIntervalData(newDayIntervalValue)
        }
        open={taskFormOpen}
        onAlertOpen={(): void => setAlertOpen(true)}
        onClose={handleTaskFormClose}
        taskId={taskId}
      />
      <PopupAlert
        open={alertOpen}
        onClose={(): void => setAlertOpen(false)}
        message={
          taskId === undefined
            ? "Task has been successfully created"
            : "Task has been successfully edited"
        }
      />
    </main>
  );
}
