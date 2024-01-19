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
import dummyTagData, { ITagData } from "./data/tagData";

export default function Home() {
  const [taskListData, setTaskListData] = useState(dummyTaskListData);
  const [taskData, setTaskData] = useState(dummyTaskData);
  const [timeIntervalData, setTimeIntervalData] = useState(dummyTimeInterval);
  const [dayIntervalData, setDayIntervalData] = useState(dummyDayInterval);
  const [tagData, setTagData] = useState(dummyTagData);

  console.log("taskData:", taskData);
  console.log("timeIntervalData:", timeIntervalData);
  console.log("dayIntervalData:", dayIntervalData);
  console.log("tagData:", tagData);

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
  const handleTaskDataCreate = (): void => {
    setTaskId(undefined);
    setFormOpen(true);
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
    const taskList = taskListData.map((item) => item.taskListName);
    values.taskList = values.schedule === "Today" ? "Today" : values.taskList;
    values.taskList = values.schedule === "Date" ? "Unsorted" : values.taskList;

    // find task list
    let taskListId = "";
    if (taskList.includes(values.taskList)) {
      const findTaskList = taskListData.find(
        (item) => item.taskListName === values.taskList
      );
      taskListId = findTaskList?.taskListId || createId();
    }
    // create task list
    else {
      const newTaskList: ITaskListData = {
        taskListId: createId(),
        taskListName: values.taskList,
      };
      taskListId = newTaskList.taskListId;
      setTaskListData([...taskListData, newTaskList]);
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

    // generating new newTag row
    const newTag: ITagData = {
      tagId: createId(),
      tagName: values.tags,
      taskId: newTask.taskId,
    };

    // edit task
    if (values.edit) {
      const taskIndex = taskData.findIndex((item) => item.taskId === taskId);
      const timeIntervalIndex = timeIntervalData.findIndex(
        (item) => item.taskId === taskId
      );
      const dayIntervalIndex = dayIntervalData.findIndex(
        (item) => item.taskId === taskId
      );
      const tagIndex = tagData.findIndex((item) => item.taskId === taskId);

      // updating task
      newTask.taskId = taskData[taskIndex].taskId;
      taskData[taskIndex] = newTask;
      setTaskData([...taskData]);
      // creating/updating intervals if custom
      if (values.schedule === "Custom") {
        // updating intervals
        if (timeIntervalIndex !== -1) {
          newTimeInterval.taskId = timeIntervalData[timeIntervalIndex].taskId;
          newTimeInterval.timeIntervalId =
            timeIntervalData[timeIntervalIndex].timeIntervalId;
          timeIntervalData[timeIntervalIndex] = newTimeInterval;
          setTimeIntervalData([...timeIntervalData]);
        }
        if (dayIntervalIndex !== -1) {
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

        // restting date
        newTask.dueDate = defaultInitialValues.dueDate;
      }
      // deleting intervals if not custom
      else if (values.schedule === "Today" || values.schedule === "Date") {
        if (timeIntervalIndex !== -1) {
          newTimeInterval.taskId = timeIntervalData[timeIntervalIndex].taskId;
          const filteredTimeIntervalData = timeIntervalData.filter(
            (item) => item.taskId !== newTimeInterval.taskId
          );
          setTimeIntervalData([...filteredTimeIntervalData]);
        }
        if (dayIntervalIndex !== -1) {
          newDayInterval.taskId = dayIntervalData[dayIntervalIndex].taskId;
          const filteredDayIntervalData = dayIntervalData.filter(
            (item) => item.taskId !== newDayInterval.taskId
          );
          setDayIntervalData([...filteredDayIntervalData]);
        }
      }
      // updating tags
      if (tagIndex !== -1) {
        newTag.taskId = tagData[tagIndex].taskId;
        tagData[tagIndex] = newTag;
        setTagData([...tagData]);
      } else {
        setTagData([...tagData, newTag]);
      }
    }
    // create task
    else {
      setTaskData([...taskData, newTask]);
      setTimeIntervalData([...timeIntervalData, newTimeInterval]);
      setDayIntervalData([...dayIntervalData, newDayInterval]);
      setTagData([...tagData, newTag]);
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
      const currentTagData = tagData.find((tag) => tag.taskId === taskId);

      initialValues.taskName = taskName;
      initialValues.taskDescription = taskDescription;
      initialValues.dueDate = dueDate;
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
      initialValues.tags = currentTagData?.tagName || defaultInitialValues.tags;
      initialValues.edit = true;

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
          onFormOpen={handleTaskDataCreate}
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
          onTaskDataEdit={(taskId: string): void => {
            setTaskId(taskId);
            setFormOpen(true);
          }}
          onTaskDataDelete={(taskId: string): void => {
            const updatedTaskData = taskData.filter(
              (task) => task.taskId !== taskId
            );
            setTaskData(updatedTaskData);
          }}
        />
        <AddTaskMiniButton onClick={handleTaskDataCreate} />
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
