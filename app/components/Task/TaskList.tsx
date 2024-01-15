import dummyTaskData, { ITaskData } from "@/app/data/task-data";
import dummyTaskListData, { ITaskListData } from "@/app/data/taskList-data";
import { Dispatch, SetStateAction, useState } from "react";
import { Container, Typography } from "../../lib/MUI-core-v4";
import TaskItem from "./common/TaskItem";

interface Props {
  task_list_data: ITaskListData[];
  task_data: ITaskData[];
  set_task_data: Dispatch<SetStateAction<ITaskData[]>>;
  onSelectTask: (value: string) => void;
  onTaskFormOpen: () => void;
}

const TaskList = ({
  onSelectTask,
  onTaskFormOpen,
  task_list_data,
  task_data,
  set_task_data,
}: Props) => {
  const handleTaskCheckbox = (taskId: string): void => {
    const updatedTaskData = task_data.map((task) => {
      if (task.taskId === taskId) {
        return {
          ...task,
          status: !task.status,
        };
      }
      return task;
    });
    console.log("handleTaskCheckbox");
    set_task_data(updatedTaskData);
  };

  const handleButtonClick = (taskId: string): void => {
    onTaskFormOpen();
    onSelectTask(taskId);
  };

  return (
    <Container maxWidth="sm" className="mt-10">
      {task_list_data.map((taskList) => (
        <div key={taskList.taskListName} className="mt-5">
          <Typography variant="h6">{taskList.taskListName}</Typography>
          {task_data.map((task) =>
            taskList.taskListId === task.taskListId ? (
              <TaskItem
                key={task.taskName}
                taskName={task.taskName}
                status={task.status}
                onButtonClick={() => handleButtonClick(task.taskId)}
                onCheckboxChange={() => handleTaskCheckbox(task.taskId)}
              />
            ) : null
          )}
        </div>
      ))}
    </Container>
  );
};

export default TaskList;
