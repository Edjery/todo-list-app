"use client";

import { Box } from "@/app/lib/MUI-core-v4";
import { createId } from "@paralleldrive/cuid2";
import dayjs from "dayjs";
import { useState } from "react";
import AddTaskMiniButton from "./components/AddTaskMiniButton";
import SearchFormDialog from "./components/Header/Dialog/SearchFormDialog";
import TaskHeader from "./components/Header/TaskHeader";
import TaskFormDialog from "./components/Task/TaskFormDialog";
import TaskList from "./components/Task/TaskList";
import PopupAlert from "./components/Task/common/PopupAlert";
import { ITaskForm } from "./components/Task/form/ITaskForm";
import {
  defaultInitialValues,
  defaultScheduleValue,
  defaultTaskListChoice,
  defaultTimeInterval,
  defualtDayInterval,
  sortList,
} from "./data/dataMatrix";
import dummyDayInterval, { IDayInterval } from "./data/dayIntervalData";
import dummyTaskData, { ITaskData } from "./data/taskData";
import dummyTaskListData, { ITaskListData } from "./data/taskListData";
import dummyTimeInterval, { ITimeInterval } from "./data/timeIntervalData";

export default function Home() {
  const [taskListData, setTaskListData] = useState(dummyTaskListData);
  const [taskData, setTaskData] = useState(dummyTaskData);
  const [timeIntervalData, setTimeIntervalData] = useState(dummyTimeInterval);
  const [dayIntervalData, setDayIntervalData] = useState(dummyDayInterval);

  console.log("taskData:", taskData);
  console.log("timeIntervalData:", timeIntervalData);
  console.log("dayIntervalData:", dayIntervalData);

  const [taskId, setTaskId] = useState<string | undefined>(undefined);
  const [formOpen, setFormOpen] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [sortValue, setSortValue] = useState<string>(sortList[0]);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const searchedTaskData = taskData.filter((task) =>
    task.taskName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // handle tasks
  const handleTaskDataAdd = (): void => {
    setTaskId(undefined);
    setFormOpen(true);
  };

  const handleTaskDataEdit = (taskId: string): void => {
    setTaskId(taskId);
    setFormOpen(true);
  };

  const handleTaskDataDelete = (taskId: string): void => {
    const updatedTaskData = taskData.filter((task) => task.taskId !== taskId);
    setTaskData(updatedTaskData);
  };

  const handleTaskStatusUpdate = (taskId: string): void => {
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

  const getTaskDataSorted = () => {
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

  // handle forms
  const handleFormSubmit = (values: ITaskForm): void => {
    // init
    const taskList = taskListData.map((item) => item.taskListName);

    // handle
    let taskListId: string;

    if (values.schedule === "Today") {
      values.taskList = "Today";
    }
    if (values.schedule === "Date") {
      values.taskList = "Unsorted";
    }

    // new task list
    if (!taskList.includes(values.taskList)) {
      const newTaskList: ITaskListData = {
        taskListId: createId(),
        taskListName: values.taskList,
      };
      taskListId = newTaskList.taskListId;
      setTaskListData([...taskListData, newTaskList]);
    }
    // existing task list
    else {
      const findTaskList = taskListData.find(
        (item) => item.taskListName === values.taskList
      )?.taskListId;
      taskListId = findTaskList === undefined ? createId() : findTaskList;
    }

    // generating new task row
    const newTask: ITaskData = {
      taskId: createId(),
      dateCreated: dayjs().format("YYYY-MM-DDTHH:mm:ss"),
      taskName: values.taskName,
      taskDescription: values.taskDescription,
      dueDate: values.dueDate,
      priority: values.priority,
      status: false,
      taskListId: taskListId,
    };

    // generating new timeInterval row
    const newTimeInterval: ITimeInterval = {
      timeIntervalId: createId(),
      daily: values.timeInterval[0].status,
      weekly: values.timeInterval[1].status,
      monthly: values.timeInterval[2].status,
      yearly: values.timeInterval[3].status,
      taskId: newTask.taskId,
    };

    // generating new dayInterval row
    const newDayInterval: IDayInterval = {
      dayIntervalValId: createId(),
      sunday: values.dayInterval[0].status,
      monday: values.dayInterval[1].status,
      tuesday: values.dayInterval[2].status,
      wednesday: values.dayInterval[3].status,
      thursday: values.dayInterval[4].status,
      friday: values.dayInterval[5].status,
      saturday: values.dayInterval[6].status,
      taskId: newTask.taskId,
    };

    if (values.edit) {
      // if existing task
      const taskIndex = taskData.findIndex((item) => item.taskId === taskId);
      const timeIntervalIndex = timeIntervalData.findIndex(
        (item) => item.taskId === taskId
      );
      const dayIntervalIndex = dayIntervalData.findIndex(
        (item) => item.taskId === taskId
      );

      // setting task
      newTask.taskId = taskData[taskIndex].taskId;
      taskData[taskIndex] = newTask;
      if (taskIndex !== -1) {
        // creating task if custom
        if (values.schedule === "Custom") {
          // overwriting intervals
          console.log("timeIntervalIndex:", timeIntervalIndex);
          console.log("dayIntervalIndex:", dayIntervalIndex);
          if (timeIntervalIndex !== -1) {
            // connecting time interval to task
            newTimeInterval.taskId = timeIntervalData[timeIntervalIndex].taskId;
            newTimeInterval.timeIntervalId =
              timeIntervalData[timeIntervalIndex].timeIntervalId;
            timeIntervalData[timeIntervalIndex] = newTimeInterval;
            setTimeIntervalData([...timeIntervalData]);
          }
          if (dayIntervalIndex !== -1) {
            // connecting day interval to task
            newDayInterval.taskId = dayIntervalData[dayIntervalIndex].taskId;
            newDayInterval.dayIntervalValId =
              dayIntervalData[dayIntervalIndex].dayIntervalValId;
            dayIntervalData[dayIntervalIndex] = newDayInterval;
            setDayIntervalData([...dayIntervalData]);
          }

          // creating intervals
          if (timeIntervalIndex === -1) {
            newTimeInterval.taskId = newTask.taskId;
            setTimeIntervalData([...timeIntervalData, newTimeInterval]);
          }
          if (dayIntervalIndex === -1) {
            newDayInterval.taskId = newTask.taskId;
            setDayIntervalData([...dayIntervalData, newDayInterval]);
          }

          // removing date
          newTask.dueDate = "";
        } else if (values.schedule === "Today" || values.schedule === "Date") {
          // deleting intervals if exist
          if (timeIntervalIndex !== -1) {
            // setting time interval
            newTimeInterval.taskId = timeIntervalData[timeIntervalIndex].taskId;
            const removeTimeInterval = timeIntervalData.filter(
              (item) => item.taskId !== newTimeInterval.taskId
            );
            setTimeIntervalData([...removeTimeInterval]);
          }
          if (dayIntervalIndex !== -1) {
            // setting day interval
            newDayInterval.taskId = dayIntervalData[dayIntervalIndex].taskId;
            const removeDayInterval = dayIntervalData.filter(
              (item) => item.taskId !== newDayInterval.taskId
            );
            setDayIntervalData([...removeDayInterval]);
          }
        }

        setTaskData([...taskData]);
      } else {
        console.error(`Task with taskId ${newTask.taskId} not found.`);
      }
      // new task
    } else {
      setTimeIntervalData([...timeIntervalData, newTimeInterval]);
      setDayIntervalData([...dayIntervalData, newDayInterval]);
      setTaskData([...taskData, newTask]);
    }
  };

  // Function to compare two arrays of objects
  const areArrayObjectsEqual = (
    firstArray: {
      choice: string;
      status: boolean;
    }[],
    secondArray: {
      choice: string;
      status: boolean;
    }[]
  ): boolean => {
    if (firstArray.length !== secondArray.length) {
      return false;
    }

    for (let i = 0; i < firstArray.length; i++) {
      if (!isObjectEqual(firstArray[i], secondArray[i])) {
        return false;
      }
    }

    return true;
  };

  // Function to compare two objects
  const isObjectEqual = (
    firstObject: {
      choice: string;
      status: boolean;
    },
    secondObject: {
      choice: string;
      status: boolean;
    }
  ): boolean => {
    const firstKeys = Object.keys(firstObject) as Array<
      keyof typeof firstObject
    >;
    const secondKeys = Object.keys(secondObject) as Array<
      keyof typeof secondObject
    >;

    if (firstKeys.length !== secondKeys.length) {
      return false;
    }

    for (const key of firstKeys) {
      if (firstObject[key] !== secondObject[key]) {
        return false;
      }
    }

    return true;
  };

  const initForm = (): {
    initialValues: ITaskForm;
    taskListData: ITaskListData[];
  } => {
    const initialValues: ITaskForm = {
      taskName: defaultInitialValues.taskName,
      taskDescription: defaultInitialValues.taskDescription,
      schedule: defaultInitialValues.schedule,
      dueDate: defaultInitialValues.dueDate,
      timeInterval: defaultInitialValues.timeInterval,
      dayInterval: defaultInitialValues.dayInterval,
      priority: defaultInitialValues.priority,
      taskList: defaultInitialValues.taskList,
      tags: defaultInitialValues.tags,
      edit: defaultInitialValues.edit,
    };
    const ifTaskExist = taskData.find((task) => task.taskId === taskId);

    if (ifTaskExist) {
      const { taskName, taskDescription, dueDate, priority, taskListId } =
        ifTaskExist;
      const currentTaskList = taskListData.find(
        (list) => list.taskListId === taskListId
      );
      const currentTimeInterval = timeIntervalData.find(
        (timeInterval) => timeInterval.taskId === taskId
      );
      const currentDayInterval = dayIntervalData.find(
        (dayInterval) => dayInterval.taskId === taskId
      );

      initialValues.taskName = taskName;
      initialValues.taskDescription = taskDescription;
      initialValues.dueDate = dueDate;

      // setting initial schedule
      const sameTimeInterval = areArrayObjectsEqual(
        initialValues.timeInterval,
        defaultTimeInterval
      );
      const sameDayInterval = areArrayObjectsEqual(
        initialValues.dayInterval,
        defualtDayInterval
      );
      const defaultIntervals = sameTimeInterval && sameDayInterval;

      if (defaultIntervals && initialValues.taskList === defaultScheduleValue) {
        initialValues.schedule = defaultScheduleValue;
      } else if (initialValues.dueDate !== "") {
        initialValues.schedule = "Date";
      } else if (
        !defaultIntervals ||
        initialValues.taskList !== defaultScheduleValue
      ) {
        initialValues.schedule = "Custom";
      }

      initialValues.timeInterval = [
        {
          choice: "Daily",
          status:
            currentTimeInterval?.daily !== undefined
              ? currentTimeInterval?.daily
              : false,
        },
        {
          choice: "Weekly",
          status:
            currentTimeInterval?.weekly !== undefined
              ? currentTimeInterval?.weekly
              : false,
        },
        {
          choice: "Monthly",
          status:
            currentTimeInterval?.monthly !== undefined
              ? currentTimeInterval?.monthly
              : false,
        },
        {
          choice: "Yearly",
          status:
            currentTimeInterval?.yearly !== undefined
              ? currentTimeInterval?.yearly
              : false,
        },
      ];
      initialValues.dayInterval = [
        {
          choice: "Sunday",
          status:
            currentDayInterval?.sunday !== undefined
              ? currentDayInterval?.sunday
              : false,
        },
        {
          choice: "Monday",
          status:
            currentDayInterval?.monday !== undefined
              ? currentDayInterval?.monday
              : false,
        },
        {
          choice: "Tuesday",
          status:
            currentDayInterval?.tuesday !== undefined
              ? currentDayInterval?.tuesday
              : false,
        },
        {
          choice: "Wednesday",
          status:
            currentDayInterval?.wednesday !== undefined
              ? currentDayInterval?.wednesday
              : false,
        },
        {
          choice: "Thursday",
          status:
            currentDayInterval?.thursday !== undefined
              ? currentDayInterval?.thursday
              : false,
        },
        {
          choice: "Friday",
          status:
            currentDayInterval?.friday !== undefined
              ? currentDayInterval?.friday
              : false,
        },
        {
          choice: "Saturday",
          status:
            currentDayInterval?.saturday !== undefined
              ? currentDayInterval?.saturday
              : false,
        },
      ];
      initialValues.priority = priority;
      initialValues.taskList =
        currentTaskList?.taskListName || defaultTaskListChoice;
      initialValues.edit = true;
    } else {
      initialValues.taskName = defaultInitialValues.taskName;
      initialValues.taskDescription = defaultInitialValues.taskDescription;
      initialValues.schedule = defaultInitialValues.schedule;
      initialValues.dueDate = defaultInitialValues.dueDate;
      initialValues.timeInterval = defaultInitialValues.timeInterval;
      initialValues.dayInterval = defaultInitialValues.dayInterval;
      initialValues.priority = defaultInitialValues.priority;
      initialValues.taskList = defaultInitialValues.taskList;
      initialValues.tags = defaultInitialValues.tags;
      initialValues.edit = defaultInitialValues.edit;
    }
    return { initialValues, taskListData };
  };

  return (
    <main>
      <Box>
        <TaskHeader
          onSearchOpen={(): void => setSearchOpen(true)}
          onTaskFormOpen={handleTaskDataAdd}
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
          taskDataToDisplay={getTaskDataSorted()}
          onTaskStatusUpdate={handleTaskStatusUpdate}
          onTaskDataEdit={handleTaskDataEdit}
          onTaskDataDelete={handleTaskDataDelete}
        />
        <AddTaskMiniButton onClick={handleTaskDataAdd} />
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
        open={formOpen}
        initForm={initForm}
        onFormSubmit={handleFormSubmit}
        onAlertOpen={(): void => setAlertOpen(true)}
        onClose={(): void => setFormOpen(false)}
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
