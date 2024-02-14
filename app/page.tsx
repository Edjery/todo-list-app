"use client";

import { Box, Container } from "@/app/lib/MUI-core-v4";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import AddTaskMiniButton from "./components/AddTaskMiniButton";
import SearchFormDialog from "./components/Header/Dialog/SearchFormDialog";
import TaskHeader from "./components/Header/TaskHeader";
import TaskFormDialog from "./components/Task/TaskFormDialog";
import TaskList from "./components/Task/TaskList";
import PopupAlert from "./components/Task/common/PopupAlert";
import ITaskForm from "./components/Task/form/ITaskForm";
import { defaultInitialValues, sortList } from "./data/dataMatrix";
import { Skeleton } from "./lib/MUI-lab-v4";
import dayIntervalService from "./services/DayIntervalService";
import IDayInterval from "./services/Interfaces/IDayInterval";
import ITag from "./services/Interfaces/ITag";
import ITask from "./services/Interfaces/ITask";
import ITaskList from "./services/Interfaces/ITaskList";
import ITimeInterval from "./services/Interfaces/ITimeInterval";
import tagService from "./services/TagService";
import taskListService from "./services/TaskListSevice";
import taskService from "./services/TaskService";
import timeIntervalService from "./services/TimeIntervalService";

export default function Home() {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [taskId, setTaskId] = useState<number | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [sortValue, setSortValue] = useState<string>(sortList[0]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [formOpen, setFormOpen] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(false);
        setTasks(await taskService.getAll());
        console.log("Data has been successfully fetched");
      } catch (error) {
        setLoading(false);
        console.error("Error loading data:", error);
        throw error;
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <Container maxWidth="md">
        <Box className="mt-6">
          <Skeleton height={100} width={910} />
        </Box>
      </Container>
    );
  }

  // handle tasks
  const handleTaskDataCreate = () => {
    setTaskId(undefined);
    setFormOpen(true);
  };

  // handle forms
  const handleFormSubmit = async (values: ITaskForm) => {
    // TaskList init
    const taskLists = await taskListService.getAll();
    const taskListNames = taskLists.map((item) => item.name);
    let taskListId = 0;
    values.taskList = values.schedule === "Today" ? "Today" : values.taskList;
    values.taskList = values.schedule === "Date" ? "Unsorted" : values.taskList;
    values.taskList =
      values.taskList === defaultInitialValues.taskList
        ? defaultInitialValues.taskList + "ahan"
        : values.taskList;

    // find task list if exist
    if (taskListNames.includes(values.taskList)) {
      const taskListValue = taskListService.getByName(values.taskList);
      if (taskListValue) taskListId = taskListValue.id;
      else console.error("Tasklist has a missing ID!");
    }
    // create task list if not exist
    else {
      const newTaskList: ITaskList = await taskListService.create({
        id: 0, // this is not actually used
        name: values.taskList,
      });
      taskListId = newTaskList.id;
    }

    // initializing task values
    const newTask: ITask = {
      id: values.id || 0, // not used in the service
      name: values.name,
      description: values.description,
      dueAt: values.dueAt || dayjs().format("YYYY-MM-DD"),
      priority: values.priority,
      status: false,
      createdAt: dayjs().format("YYYY-MM-DDTHH:mm:ss"), // not used in the service
      taskListId: taskListId,
    };
    // initializing timeInterval values
    const newTimeInterval: ITimeInterval = {
      id: 0, // not used in the service
      daily: values.timeIntervalData[0].status,
      weekly: values.timeIntervalData[1].status,
      monthly: values.timeIntervalData[2].status,
      yearly: values.timeIntervalData[3].status,
      taskId: newTask.id,
    };
    // initializing dayInterval values
    const newDayInterval: IDayInterval = {
      id: 0, // not used in the service
      sunday: values.dayIntervalData[0].status,
      monday: values.dayIntervalData[1].status,
      tuesday: values.dayIntervalData[2].status,
      wednesday: values.dayIntervalData[3].status,
      thursday: values.dayIntervalData[4].status,
      friday: values.dayIntervalData[5].status,
      saturday: values.dayIntervalData[6].status,
      taskId: newTask.id,
    };
    // initializing newTag values
    const newTag: ITag = {
      id: 0, // not used in the service
      name: values.tags,
      taskId: newTask.id,
    };

    // creating task
    if (!values.id) {
      const createdTask = await taskService.create(newTask);

      newTimeInterval.taskId = createdTask.id;
      newDayInterval.taskId = createdTask.id;
      newTag.taskId = createdTask.id;

      timeIntervalService.create(newTimeInterval);
      dayIntervalService.create(newDayInterval);
      tagService.create(newTag);

      setTasks([...tasks, createdTask]);
    }
    // editing task
    else {
      // updating task id
      const taskToBeUpdated = taskService.get(values.id);
      if (taskToBeUpdated) newTask.id = taskToBeUpdated.id;

      const timeIntervalToBeUpdated = timeIntervalService.getByTaskId(
        newTask.id
      );
      const dayIntervalToBeUpdated = dayIntervalService.getByTaskId(newTask.id);
      // creating/updating intervals if custom
      if (values.schedule === "Custom") {
        // creating time interval
        if (!timeIntervalToBeUpdated) {
          newTimeInterval.taskId = newTask.id;
          timeIntervalService.create(newTimeInterval);
        }
        // updating time interval
        else {
          newTimeInterval.id = timeIntervalToBeUpdated.id;
          newTimeInterval.taskId = values.id;
          timeIntervalService.update(
            timeIntervalToBeUpdated.id,
            newTimeInterval
          );
        }
        // creating day interval
        if (!dayIntervalToBeUpdated) {
          newDayInterval.taskId = newTask.id;
          dayIntervalService.create(newDayInterval);
        }
        // updating day interval
        else {
          newDayInterval.id = dayIntervalToBeUpdated.id;
          newDayInterval.taskId = values.id;
          dayIntervalService.update(dayIntervalToBeUpdated.id, newDayInterval);
        }
        // resetting date
        newTask.dueAt = defaultInitialValues.dueAt;
      }
      // defaulting intervals if not custom
      else {
        if (timeIntervalToBeUpdated)
          timeIntervalService.update(timeIntervalToBeUpdated.id, {
            id: 0, // not used in the service
            daily: false,
            weekly: false,
            monthly: false,
            yearly: false,
            taskId: newTask.id,
          });
        if (dayIntervalToBeUpdated)
          dayIntervalService.update(dayIntervalToBeUpdated.id, {
            id: 0, // not used in the service
            sunday: false,
            monday: false,
            tuesday: false,
            wednesday: false,
            thursday: false,
            friday: false,
            saturday: false,
            taskId: newTask.id,
          });

        // resetting date if needed
        if (values.schedule === "Today") {
          newTask.dueAt = defaultInitialValues.dueAt;
        }
      }

      const tagToBeUpdated = tagService.getByTaskId(values.id);
      // creating tags
      if (!tagToBeUpdated) tagService.create(newTag);
      // updating tags
      else {
        newTag.id = tagToBeUpdated.id;
        newTag.taskId = tagToBeUpdated.taskId;
        tagService.update(newTag.id, newTag);
      }

      // updating task locally
      const updatedTasks = tasks.map((task) =>
        task.id === values.id ? newTask : task
      );
      setTasks(updatedTasks);

      // updating task in db
      taskService.update(values.id, newTask);
    }
  };

  const searchedTask = tasks.filter((data) =>
    data.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortData = (task: ITask[]): ITask[] => {
    const sortedTaskData = task.sort((a, b) => {
      if (sortValue === "Default") {
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);
        return dateB.getTime() - dateA.getTime();
      } else if (sortValue === "Date Created") {
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);
        return dateA.getTime() - dateB.getTime();
      } else if (sortValue === "Name") {
        return a.name.localeCompare(b.name);
      }
      return 0;
    });
    return sortedTaskData;
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
          tasks={sortData(searchedTask)}
          onStatusUpdate={async (taskId: number) => {
            await taskService.updateStatus(taskId);
            setTasks(await taskService.getAll());
          }}
          onTaskEdit={(taskId: number) => {
            setTaskId(taskId);
            setFormOpen(true);
          }}
          onTaskDelete={async (taskId: number) => {
            await taskService.remove(taskId);
            setTasks(await taskService.getAll());
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
        taskId={taskId}
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
