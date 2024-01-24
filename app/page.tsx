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
import { defaultInitialValues, sortList } from "./data/dataMatrix";
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
  const [tasks, setTasks] = useState<ITask[]>(taskService.getAll());
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
    console.log(values.id);
    // TaskList init
    const taskListNames = taskListService.getAll().map((item) => item.name);
    let taskListId = "";
    values.taskList = values.schedule === "Today" ? "Today" : values.taskList;
    values.taskList = values.schedule === "Date" ? "Unsorted" : values.taskList;

    // find task list if exist
    if (taskListNames.includes(values.taskList)) {
      const taskListValue = taskListService.getByName(values.taskList);
      if (taskListValue) taskListId = taskListValue.id;
      else console.error("Tasklist has a missing ID!");
    }
    // create task list if not exist
    else {
      const newTaskList: ITaskList = taskListService.create({
        id: createId(),
        name: values.taskList,
      });
      taskListId = newTaskList.id;
    }

    // initializing task values
    const newTask: ITask = {
      id: values.id || createId(),
      dateCreated: dayjs().format("YYYY-MM-DDTHH:mm:ss"),
      name: values.name,
      description: values.description,
      dueDate: values.dueDate,
      priority: values.priority,
      status: false,
      taskListId: taskListId,
    };
    // initializing timeInterval values
    const newTimeInterval: ITimeInterval = {
      id: createId(),
      daily: values.timeIntervalData[0].status,
      weekly: values.timeIntervalData[1].status,
      monthly: values.timeIntervalData[2].status,
      yearly: values.timeIntervalData[3].status,
      taskId: newTask.id,
    };
    // initializing dayInterval values
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
    // initializing newTag values
    const newTag: ITag = {
      id: createId(),
      name: values.tags,
      taskId: newTask.id,
    };

    // creating task
    if (!values.id) {
      taskService.create(newTask);
      timeIntervalService.create(newTimeInterval);
      dayIntervalService.create(newDayInterval);
      tagService.create(newTag);
    }
    // editing task
    else {
      // updating task id
      const taskToBeUpdated = taskService.get(values.id);
      if (taskToBeUpdated) newTask.id = taskToBeUpdated.id;

      const timeIntervalToBeUpdated = timeIntervalService.getByTaskId(
        values.id
      );
      const dayIntervalToBeUpdated = dayIntervalService.getByTaskId(values.id);
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
        newTask.dueDate = defaultInitialValues.dueDate;
      }
      // deleting intervals if not custom
      else {
        if (timeIntervalToBeUpdated)
          timeIntervalService.remove(timeIntervalToBeUpdated.id);
        if (dayIntervalToBeUpdated)
          dayIntervalService.remove(dayIntervalToBeUpdated.id);
        // resetting date if needed
        newTask.dueDate =
          values.schedule === "Today"
            ? defaultInitialValues.dueDate
            : newTask.dueDate;
      }

      const tagToBeUpdated = tagService.getByTaskId(values.id);
      // creating tags
      if (!tagToBeUpdated) tagService.create(newTag);
      // updating tags
      else {
        newTag.id = tagToBeUpdated.id;
        newTag.taskId = tagToBeUpdated.taskId;
        tagService.update(tagToBeUpdated.id, newTag);
      }

      // updating task
      taskService.update(values.id, newTask);
    }
    setTasks([...taskService.getAll()]);
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
          tasks={getTaskDataSorted()}
          onStatusUpdate={(taskId: string) => {
            taskService.updateStatus(taskId);
            setTasks([...taskService.getAll()]);
          }}
          onEdit={(taskId: string) => {
            setTaskId(taskId);
            setFormOpen(true);
          }}
          onDelete={(taskId: string) => {
            taskService.remove(taskId);
            setTasks([...taskService.getAll()]);
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
