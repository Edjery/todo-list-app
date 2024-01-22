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
import { IDayInterval } from "./data/dayIntervalData";
import { ITag } from "./data/tagData";
import { ITask } from "./data/taskData";
import { ITaskList } from "./data/taskListData";
import { ITimeInterval } from "./data/timeIntervalData";
import dayIntervalService from "./services/DayIntervalService";
import tagService from "./services/TagService";
import taskListService from "./services/TaskListSevice";
import taskService from "./services/TaskService";
import timeIntervalService from "./services/TimeIntervalService";

export default function Home() {
  const [taskList, setTaskList] = useState<ITaskList[]>(
    taskListService.getAll()
  );
  const [task, setTask] = useState<ITask[]>(taskService.getAll());
  const [timeInterval, setTimeInterval] = useState<ITimeInterval[]>(
    timeIntervalService.getAll()
  );
  const [dayInterval, setDayInterval] = useState<IDayInterval[]>(
    dayIntervalService.getAll()
  );
  const [tag, setTag] = useState<ITag[]>(tagService.getAll());

  console.log("taskList:", taskList);
  console.log("task:", task);
  console.log("timeInterval:", timeInterval);
  console.log("dayInterval:", dayInterval);
  console.log("tag:", tag);

  const [taskId, setTaskId] = useState<string | undefined>(undefined);
  const [formOpen, setFormOpen] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [sortValue, setSortValue] = useState<string>(sortList[0]);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const filteredTaskData = task.filter((data) =>
    data.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // handle tasks
  const handleTaskDataCreate = () => {
    setTaskId(undefined);
    setFormOpen(true);
  };

  const handleTaskStatusUpdate = (taskId: string) => {
    const updatedTaskData = task.map((data) => {
      if (data.id === taskId) {
        return {
          ...data,
          status: !data.status,
        };
      }
      return data;
    });
    setTask(updatedTaskData);
  };

  const getTaskDataSorted = () => {
    const sortedTaskData = filteredTaskData.sort((a, b) => {
      if (sortValue === "Default") {
        const dateA = new Date(a.dateCreated);
        const dateB = new Date(b.dateCreated);
        return dateB.getTime() - dateA.getTime();
      } else if (sortValue === "Date Created") {
        const dateA = new Date(a.dateCreated);
        const dateB = new Date(b.dateCreated);
        return dateA.getTime() - dateB.getTime();
      } else if (sortValue === "Name") {
        return a.name.localeCompare(b.name);
      }
      return 0;
    });
    return sortedTaskData;
  };

  // handle forms
  const handleFormSubmit = (values: ITaskForm) => {
    const taskListNames = taskList.map((item) => item.name);
    values.taskListName =
      values.schedule === "Today" ? "Today" : values.taskListName;
    values.taskListName =
      values.schedule === "Date" ? "Unsorted" : values.taskListName;

    // find task list
    let taskListId = "";
    if (taskListNames.includes(values.taskListName)) {
      const findTaskList = taskList.find(
        (item) => item.name === values.taskListName
      );
      taskListId = findTaskList?.id || createId();
    }
    // create task list
    else {
      const newTaskList: ITaskList = {
        id: createId(),
        name: values.taskListName,
      };
      taskListId = newTaskList.id;
      setTaskList([...taskList, newTaskList]);

      taskListService.getAll();
      taskListService.create(newTaskList);
      setTaskList(taskListService.getAll());
    }

    // generating new task row
    const newTask: ITask = {
      id: createId(),
      dateCreated: dayjs().format("YYYY-MM-DDTHH:mm:ss"),
      name: values.taskName,
      description: values.taskDescription,
      dueDate: values.dueDate,
      priority: values.priority,
      status: false,
      taskListId: taskListId,
    };

    // generating new timeInterval row
    const newTimeInterval: ITimeInterval = {
      id: createId(),
      daily: values.timeIntervalData[0].status,
      weekly: values.timeIntervalData[1].status,
      monthly: values.timeIntervalData[2].status,
      yearly: values.timeIntervalData[3].status,
      taskId: newTask.id,
    };

    // generating new dayInterval row
    const newDayInterval: IDayInterval = {
      id: createId(),
      sunday: values.dayIntervalData[0].status,
      monday: values.dayIntervalData[1].status,
      tuesday: values.dayIntervalData[2].status,
      wednesday: values.dayIntervalData[3].status,
      thursday: values.dayIntervalData[4].status,
      friday: values.dayIntervalData[5].status,
      saturday: values.dayIntervalData[6].status,
      taskId: newTask.id,
    };

    // generating new newTag row
    const newTag: ITag = {
      id: createId(),
      name: values.tags,
      taskId: newTask.id,
    };

    // edit task
    if (values.edit) {
      const taskIndex = task.findIndex((item) => item.id === taskId);
      const timeIntervalIndex = timeInterval.findIndex(
        (item) => item.taskId === taskId
      );
      const dayIntervalIndex = dayInterval.findIndex(
        (item) => item.taskId === taskId
      );
      const tagIndex = tag.findIndex((item) => item.taskId === taskId);

      // updating task
      newTask.id = task[taskIndex].id;
      task[taskIndex] = newTask;
      setTask([...task]);
      // creating/updating intervals if custom
      if (values.schedule === "Custom") {
        // updating intervals
        if (timeIntervalIndex !== -1) {
          newTimeInterval.taskId = timeInterval[timeIntervalIndex].taskId;
          newTimeInterval.id = timeInterval[timeIntervalIndex].id;
          timeInterval[timeIntervalIndex] = newTimeInterval;
          setTimeInterval([...timeInterval]);
        }
        if (dayIntervalIndex !== -1) {
          newDayInterval.taskId = dayInterval[dayIntervalIndex].taskId;
          newDayInterval.id = dayInterval[dayIntervalIndex].id;
          dayInterval[dayIntervalIndex] = newDayInterval;
          setDayInterval([...dayInterval]);
        }

        // creating intervals
        if (timeIntervalIndex === -1) {
          newTimeInterval.taskId = newTask.id;
          setTimeInterval([...timeInterval, newTimeInterval]);
        }
        if (dayIntervalIndex === -1) {
          newDayInterval.taskId = newTask.id;
          setDayInterval([...dayInterval, newDayInterval]);
        }

        // restting date
        newTask.dueDate = defaultInitialValues.dueDate;
      }
      // deleting intervals if not custom
      else if (values.schedule === "Today" || values.schedule === "Date") {
        if (timeIntervalIndex !== -1) {
          newTimeInterval.taskId = timeInterval[timeIntervalIndex].taskId;
          const filteredTimeIntervalData = timeInterval.filter(
            (item) => item.taskId !== newTimeInterval.taskId
          );
          setTimeInterval([...filteredTimeIntervalData]);
        }
        if (dayIntervalIndex !== -1) {
          newDayInterval.taskId = dayInterval[dayIntervalIndex].taskId;
          const filteredDayIntervalData = dayInterval.filter(
            (item) => item.taskId !== newDayInterval.taskId
          );
          setDayInterval([...filteredDayIntervalData]);
        }
      }
      // updating tags
      if (tagIndex !== -1) {
        newTag.taskId = tag[tagIndex].taskId;
        tag[tagIndex] = newTag;
        setTag([...tag]);
      } else {
        setTag([...tag, newTag]);
      }
    }
    // create task
    else {
      setTask([...task, newTask]);
      setTimeInterval([...timeInterval, newTimeInterval]);
      setDayInterval([...dayInterval, newDayInterval]);
      setTag([...tag, newTag]);
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
    taskListData: ITaskList[];
  } => {
    const initialValues: ITaskForm = {
      taskName: defaultInitialValues.taskName,
      taskDescription: defaultInitialValues.taskDescription,
      schedule: defaultInitialValues.schedule,
      dueDate: defaultInitialValues.dueDate,
      timeIntervalData: defaultInitialValues.timeIntervalData,
      dayIntervalData: defaultInitialValues.dayIntervalData,
      priority: defaultInitialValues.priority,
      taskListName: defaultInitialValues.taskListName,
      tags: defaultInitialValues.tags,
      edit: defaultInitialValues.edit,
    };
    const ifTaskExist = task.find((data) => data.id === taskId);

    if (ifTaskExist) {
      const {
        name: taskName,
        description: taskDescription,
        dueDate,
        priority,
        taskListId,
      } = ifTaskExist;
      const currentTaskList = taskList.find((list) => list.id === taskListId);
      const currentTimeInterval = timeInterval.find(
        (data) => data.taskId === taskId
      );
      const currentDayInterval = dayInterval.find(
        (data) => data.taskId === taskId
      );
      const currentTagData = tag.find((data) => data.taskId === taskId);

      initialValues.taskName = taskName;
      initialValues.taskDescription = taskDescription;
      initialValues.dueDate = dueDate;
      initialValues.timeIntervalData = [
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
      initialValues.dayIntervalData = [
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
      initialValues.taskListName =
        currentTaskList?.name || defaultTaskListChoice;
      initialValues.tags = currentTagData?.name || defaultInitialValues.tags;
      initialValues.edit = true;

      // setting initial schedule
      const sameTimeInterval = areArrayObjectsEqual(
        initialValues.timeIntervalData,
        defaultTimeInterval
      );
      const sameDayInterval = areArrayObjectsEqual(
        initialValues.dayIntervalData,
        defualtDayInterval
      );
      const defaultIntervals = sameTimeInterval && sameDayInterval;

      if (
        defaultIntervals &&
        initialValues.taskListName === defaultScheduleValue
      ) {
        initialValues.schedule = defaultScheduleValue;
      } else if (initialValues.dueDate !== "") {
        initialValues.schedule = "Date";
      } else if (
        !defaultIntervals ||
        initialValues.taskListName !== defaultScheduleValue
      ) {
        initialValues.schedule = "Custom";
      }
    } else {
      initialValues.taskName = defaultInitialValues.taskName;
      initialValues.taskDescription = defaultInitialValues.taskDescription;
      initialValues.schedule = defaultInitialValues.schedule;
      initialValues.dueDate = defaultInitialValues.dueDate;
      initialValues.timeIntervalData = defaultInitialValues.timeIntervalData;
      initialValues.dayIntervalData = defaultInitialValues.dayIntervalData;
      initialValues.priority = defaultInitialValues.priority;
      initialValues.taskListName = defaultInitialValues.taskListName;
      initialValues.tags = defaultInitialValues.tags;
      initialValues.edit = defaultInitialValues.edit;
    }
    return { initialValues, taskListData: taskList };
  };

  return (
    <main>
      <Box>
        <TaskHeader
          onSearchOpen={() => setSearchOpen(true)}
          onFormOpen={handleTaskDataCreate}
          sortValue={sortValue}
          onSortChange={(
            event: React.MouseEvent<HTMLElement>,
            newSortValue: string
          ) => {
            setSortValue(newSortValue);
          }}
        />
        <TaskList
          list={taskList}
          tasks={getTaskDataSorted()}
          onTaskStatusUpdate={handleTaskStatusUpdate}
          onTaskDataEdit={(taskId: string) => {
            setTaskId(taskId);
            setFormOpen(true);
          }}
          onTaskDataDelete={(taskId: string) => {
            const updatedTaskData = task.filter((data) => data.id !== taskId);
            setTask(updatedTaskData);
          }}
        />
        <AddTaskMiniButton onClick={handleTaskDataCreate} />
      </Box>

      <SearchFormDialog
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
        onSearch={(newSearchTerm: string) => {
          setSortValue("Search");
          setSearchTerm(newSearchTerm);
        }}
      />
      <TaskFormDialog
        open={formOpen}
        initForm={initForm}
        onFormSubmit={handleFormSubmit}
        onAlertOpen={() => setAlertOpen(true)}
        onClose={() => setFormOpen(false)}
      />
      <PopupAlert
        open={alertOpen}
        onClose={() => setAlertOpen(false)}
        message={`Task has been successfully ${
          taskId === undefined ? "created" : "edited"
        }`}
      />
    </main>
  );
}
