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

import IDayInterval from "./services/Interfaces/IDayInterval";
import ITag from "./services/Interfaces/ITag";
import ITask from "./services/Interfaces/ITask";
import ITaskList from "./services/Interfaces/ITaskList";
import ITimeInterval from "./services/Interfaces/ITimeInterval";
import dayIntervalService from "./services/DayIntervalService";
import tagService from "./services/TagService";
import taskListService from "./services/TaskListSevice";
import taskService from "./services/TaskService";
import timeIntervalService from "./services/TimeIntervalService";

export default function Home() {
  const [taskList, setTaskList] = useState<ITaskList[]>(
    taskListService.getAll()
  );
  const [tasks, setTasks] = useState<ITask[]>(taskService.getAll());
  const [timeInterval, setTimeInterval] = useState<ITimeInterval[]>(
    timeIntervalService.getAll()
  );
  const [dayInterval, setDayInterval] = useState<IDayInterval[]>(
    dayIntervalService.getAll()
  );
  const [tag, setTag] = useState<ITag[]>(tagService.getAll());

  console.log("taskListService:", taskListService.taskLists);
  console.log("taskListService.getAll():", taskListService.getAll());

  console.log("taskList:", taskList);
  console.log("task:", tasks);
  console.log("timeInterval:", timeInterval);
  console.log("dayInterval:", dayInterval);
  console.log("tag:", tag);

  const [taskId, setTaskId] = useState<string | undefined>(undefined);
  const [formOpen, setFormOpen] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [sortValue, setSortValue] = useState<string>(sortList[0]);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const filteredTaskData = tasks.filter((data) =>
    data.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // handle tasks
  const handleTaskDataCreate = () => {
    setTaskId(undefined);
    setFormOpen(true);
  };

  const handleTaskStatusUpdate = (taskId: string) => {
    // new code
    // Get the task
    const taskToBeUpdated = taskService.get(taskId);
    // Update the status
    if (taskToBeUpdated) taskToBeUpdated.status = !taskToBeUpdated.status;
    setTasks(taskService.getAll());

    // old code
    // const updatedTaskData = tasks.map((data) => {
    //   if (data.id === taskId) {
    //     console.log("Successfully Updated the Task status!");
    //     console.log("UpdatedTask:", data.name);
    //     console.log("Status:", data.status);
    //     return {
    //       ...data,
    //       status: !data.status,
    //     };
    //   }
    //   return data;
    // });
    // setTasks(updatedTaskData);
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
    let taskListId = "";
    values.taskListName =
      values.schedule === "Today" ? "Today" : values.taskListName;
    values.taskListName =
      values.schedule === "Date" ? "Unsorted" : values.taskListName;

    // find task list
    if (taskListNames.includes(values.taskListName)) {
      const findTaskList = taskList.find(
        (item) => item.name === values.taskListName
      );
      taskListId = findTaskList?.id || createId();
    }
    // create task list
    else {
      const newTaskList: ITaskList = taskListService.create({
        id: createId(),
        name: values.taskListName,
      });
      setTaskList(taskListService.getAll());
      taskListId = newTaskList.id;
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
    if (values.edit && taskId) {
      // updating task id
      const taskToBeUpdated = taskService.get(taskId);
      if (taskToBeUpdated) {
        newTask.id = taskToBeUpdated.id;
      }

      const timeIntervalToBeUpdated = timeIntervalService.getByTaskId(taskId);
      const dayIntervalToBeUpdated = dayIntervalService.getByTaskId(taskId);
      // creating/updating intervals if custom
      if (values.schedule === "Custom") {
        // resetting date
        newTask.dueDate = defaultInitialValues.dueDate;
        // updating intervals
        if (timeIntervalToBeUpdated) {
          newTimeInterval.id = timeIntervalToBeUpdated.id;
          newTimeInterval.taskId = taskId;
          timeIntervalService.update(
            timeIntervalToBeUpdated.id,
            newTimeInterval
          );
          setTimeInterval(timeIntervalService.getAll());
        } else {
          newTimeInterval.taskId = newTask.id;
          timeIntervalService.create(newTimeInterval);
          setTimeInterval(timeIntervalService.getAll());
        }
        if (dayIntervalToBeUpdated) {
          newDayInterval.id = dayIntervalToBeUpdated.id;
          newDayInterval.taskId = taskId;
          dayIntervalService.update(dayIntervalToBeUpdated.id, newDayInterval);
          setDayInterval(dayIntervalService.getAll());
        } else {
          newDayInterval.taskId = newTask.id;
          dayIntervalService.create(newDayInterval);
          setDayInterval(dayIntervalService.getAll());
        }
      }
      // deleting intervals if not custom
      else if (values.schedule === "Today" || values.schedule === "Date") {
        if (timeIntervalToBeUpdated) {
          timeIntervalService.remove(timeIntervalToBeUpdated.id);
          setTimeInterval(timeIntervalService.getAll());
        }
        if (dayIntervalToBeUpdated) {
          dayIntervalService.remove(dayIntervalToBeUpdated.id);
          setDayInterval(dayIntervalService.getAll());
        }
        newTask.dueDate =
          values.schedule === "Today"
            ? defaultInitialValues.dueDate
            : newTask.dueDate;
      }

      // updating tags
      const tagToBeUpdated = tagService.getByTaskId(taskId);
      if (tagToBeUpdated) {
        newTag.id = tagToBeUpdated.id;
        newTag.taskId = tagToBeUpdated.taskId;
        tagService.update(tagToBeUpdated.id, newTag);
        setTag(tagService.getAll());
      } else {
        tagService.create(newTag);
        setTag(tagService.getAll());
      }

      // updating task
      taskService.update(taskId, newTask);
      setTasks(taskService.getAll());
    }
    // create task
    else {
      setTasks([...tasks, taskService.create(newTask)]);
      setTimeInterval([
        ...timeInterval,
        timeIntervalService.create(newTimeInterval),
      ]);
      setDayInterval([
        ...dayInterval,
        dayIntervalService.create(newDayInterval),
      ]);
      setTag([...tag, tagService.create(newTag)]);
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

  const initForm = (): ITaskForm => {
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

    const taskExist = taskId ? taskService.get(taskId) : undefined;
    if (taskExist && taskId) {
      const { name, description, dueDate, priority, taskListId } = taskExist;
      const initialTaskList = taskListService.get(taskListId);
      const initialTimeInterval = timeIntervalService.getByTaskId(taskId);
      const initialDayInterval = dayIntervalService.getByTaskId(taskId);
      const initialTagData = tagService.getByTaskId(taskId);

      initialValues.taskName = name;
      initialValues.taskDescription = description;
      initialValues.dueDate = dueDate;
      initialValues.timeIntervalData = [
        {
          choice: "Daily",
          status:
            initialTimeInterval?.daily !== undefined
              ? initialTimeInterval?.daily
              : false,
        },
        {
          choice: "Weekly",
          status:
            initialTimeInterval?.weekly !== undefined
              ? initialTimeInterval?.weekly
              : false,
        },
        {
          choice: "Monthly",
          status:
            initialTimeInterval?.monthly !== undefined
              ? initialTimeInterval?.monthly
              : false,
        },
        {
          choice: "Yearly",
          status:
            initialTimeInterval?.yearly !== undefined
              ? initialTimeInterval?.yearly
              : false,
        },
      ];
      initialValues.dayIntervalData = [
        {
          choice: "Sunday",
          status:
            initialDayInterval?.sunday !== undefined
              ? initialDayInterval?.sunday
              : false,
        },
        {
          choice: "Monday",
          status:
            initialDayInterval?.monday !== undefined
              ? initialDayInterval?.monday
              : false,
        },
        {
          choice: "Tuesday",
          status:
            initialDayInterval?.tuesday !== undefined
              ? initialDayInterval?.tuesday
              : false,
        },
        {
          choice: "Wednesday",
          status:
            initialDayInterval?.wednesday !== undefined
              ? initialDayInterval?.wednesday
              : false,
        },
        {
          choice: "Thursday",
          status:
            initialDayInterval?.thursday !== undefined
              ? initialDayInterval?.thursday
              : false,
        },
        {
          choice: "Friday",
          status:
            initialDayInterval?.friday !== undefined
              ? initialDayInterval?.friday
              : false,
        },
        {
          choice: "Saturday",
          status:
            initialDayInterval?.saturday !== undefined
              ? initialDayInterval?.saturday
              : false,
        },
      ];
      initialValues.priority = priority;
      initialValues.taskListName =
        initialTaskList?.name || defaultTaskListChoice;
      initialValues.tags = initialTagData?.name || defaultInitialValues.tags;
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
    return initialValues;
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
            const updatedTaskData = tasks.filter((data) => data.id !== taskId);
            setTasks(updatedTaskData);
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
