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
import tagService from "./services/TagService";
import taskListService from "./services/TaskListSevice";
import taskService from "./services/TaskService";
import axios from "axios";

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
        const allTasks = await taskService.getAll();
        const updatedTasks = await updateTasks(allTasks);

        setTasks(updatedTasks);
        setLoading(false);
        console.log("Data has been successfully fetched");
      } catch (error) {
        setLoading(false);
        console.error("Error loading data:", error);
        throw error;
      }
    };

    fetchData();
  }, []);

  async function updateTasks(allTasks: ITask[]) {
    const updatedTasksPromises = allTasks.map(async (task) => {
      if (
        task.timeInterval === "Monthly" ||
        task.timeInterval === "Yearly" ||
        task.dueAt !== ""
      ) {
        const taskList = taskListService.get(task.taskListId);
        let taskListName = "";
        if (taskList) taskListName = updateTaskList(task.dueAt, taskList.name);

        const taskListId = await getTaskListId(taskListName, task.taskListId);
        task.taskListId = taskListId;
      }
      return task;
    });
    const updatedTasks = await Promise.all(updatedTasksPromises);
    return updatedTasks;
  }

  async function getTaskListId(
    taskListName: string,
    taskListId: number
  ): Promise<number> {
    const taskLists = await taskListService.getAll();
    const taskListNames = taskLists.map((item) => item.name);

    // find task list if exist
    if (taskListNames.includes(taskListName)) {
      const taskListValue = taskListService.getByName(taskListName);
      if (taskListValue) taskListId = taskListValue.id;
      else console.error("Tasklist has a missing ID!");
    }
    // create task list if not exist
    else {
      const newTaskList: ITaskList = await taskListService.create({
        id: 0, // this is not actually used
        name: taskListName,
      });
      taskListId = newTaskList.id;
    }
    return taskListId;
  }

  function updateTaskList(dueAt: string, taskListName: string) {
    const dueDate = dayjs(dueAt);
    const today = dayjs();

    if (dueDate.isSame(today, "day") && dueDate.isValid())
      taskListName = "Today";
    else if (!dueDate.isSame(today, "day") && taskListName === "Today")
      taskListName = "Unsorted";

    return taskListName;
  }

  if (loading) {
    return (
      <Container maxWidth="md">
        <Box className="mt-6">
          <Skeleton height={100} width={910} />
        </Box>

        {[...Array(3)].map((_, index) => (
          <Box className="mt-10 flex justify-center">
            <Box key={index} className="mt-5">
              <Box className="">
                <Skeleton height={100} width={600} />
              </Box>
              {[...Array(5)].map((_, index) => (
                <Box
                  key={index}
                  component="div"
                  className="flex justify-between"
                >
                  <Skeleton height={50} width={600} animation="wave" />
                </Box>
              ))}
            </Box>
          </Box>
        ))}
      </Container>
    );
  }

  // handle tasks
  const handleForm = () => {
    setTaskId(undefined);
    setFormOpen(true);
  };

  // handle forms
  const handleFormSubmit = async (values: ITaskForm) => {
    // TaskList init
    values.taskList = values.schedule === "Today" ? "Today" : values.taskList;
    values.taskList = values.schedule === "Date" ? "Unsorted" : values.taskList;
    values.taskList =
      values.taskList === defaultInitialValues.taskList
        ? defaultInitialValues.taskList + "ahan"
        : values.taskList;

    if (
      values.timeInterval === "Monthly" ||
      values.timeInterval === "Yearly" ||
      values.dueAt !== ""
    ) {
      values.taskList = updateTaskList(values.dueAt, values.taskList);
    }

    // find task list if exist
    let taskListId = 0;
    taskListId = await getTaskListId(values.taskList, taskListId);

    // initializing task values
    const newTask: ITask = {
      id: values.id || 0, // not used in the service
      name: values.name,
      description: values.description,
      dueAt: values.dueAt,
      priority: values.priority,
      status: false,
      timeInterval: values.timeInterval,
      createdAt: dayjs().format("YYYY-MM-DDTHH:mm:ss"), // not used in the service
      taskListId: taskListId,
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

    // resetting date if needed
    if (values.schedule === "Date")
      newTask.dueAt =
        newTask.dueAt === "" ? dayjs().format("YYYY-MM-DD") : newTask.dueAt;
    else if (
      newTask.timeInterval === "Daily" ||
      newTask.timeInterval === "Weekly"
    )
      newTask.dueAt = defaultInitialValues.dueAt;

    // creating task
    if (!values.id) {
      const createdTask = await taskService.create(newTask);

      newDayInterval.taskId = createdTask.id;
      newTag.taskId = createdTask.id;

      dayIntervalService.create(newDayInterval);
      tagService.create(newTag);

      setTasks([...tasks, createdTask]);
    }
    // editing task
    else {
      // updating task id
      const taskToBeUpdated = taskService.get(values.id);
      if (taskToBeUpdated) newTask.id = taskToBeUpdated.id;

      const dayIntervalToBeUpdated = dayIntervalService.getByTaskId(newTask.id);
      // creating/updating intervals if custom
      if (values.schedule === "Custom") {
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
      }
      // defaulting intervals if not custom
      else {
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
          onFormOpen={handleForm}
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
        <AddTaskMiniButton onClick={handleForm} />
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
