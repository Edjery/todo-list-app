import { ITaskData } from "@/app/data/task-data";
import { ITaskListData } from "@/app/data/taskList-data";
import { Dispatch, SetStateAction, useState } from "react";
import { Box, Container, Typography } from "../../lib/MUI-core-v4";
import ConfirmationAlert from "./common/ConfirmationAlert";
import TaskItem from "./common/TaskItem";

interface Props {
  filterList: string[];
  filterValue: string;
  task_list_data: ITaskListData[];
  task_data: ITaskData[];
  set_task_data: Dispatch<SetStateAction<ITaskData[]>>;
  onSelectTask: (value: string) => void;
  onTaskFormOpen: () => void;
}

const TaskList = ({
  filterList,
  filterValue,
  task_list_data,
  task_data,
  onSelectTask,
  onTaskFormOpen,
  set_task_data,
}: Props) => {
  const [open, setOpen] = useState(false);
  const [confirmValue, setConfirmValue] = useState("");

  const filteredTaskData = task_data.filter((task) => {
    switch (filterValue) {
      case filterList[1]:
        // Implement logic to sort by date created
        return true;
      case filterList[2]:
        // Implement logic to sort by name
        return true;
      default:
        return true; // Default to show all tasks
    }
  });

  const sortedTaskData = task_data.sort((a, b) => {
    if (filterValue === "Date Created") {
      // Sort by date created
      const dateA = new Date(a.dateCreated);
      const dateB = new Date(b.dateCreated);
      return dateB.getTime() - dateA.getTime();
    } else if (filterValue === "Name") {
      // Sort by task name alphabetically
      return a.taskName.localeCompare(b.taskName);
    } else if (filterValue === "Default") {
      return a.taskId.localeCompare(b.taskId);
    }
    return 0;
  });
  console.log("sortedTaskData:", sortedTaskData);

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
    set_task_data(updatedTaskData);
  };

  const handleButtonClick = (taskId: string): void => {
    onTaskFormOpen();
    onSelectTask(taskId);
  };

  const handleDelete = (taskId: string): void => {
    setOpen(true);
    setConfirmValue(taskId);
  };

  const handleAlertConfirm = (): void => {
    const updatedTaskData = task_data.filter(
      (task) => task.taskId !== confirmValue
    );
    set_task_data(updatedTaskData);
    setOpen(false);
  };

  return (
    <Container maxWidth="sm" className="mt-10">
      {task_list_data.map((taskList) => (
        <Box key={taskList.taskListId} className="mt-5">
          <Typography variant="h6">{taskList.taskListName}</Typography>
          {task_data.map((task) => (
            <Box key={task.taskId}>
              {taskList.taskListId === task.taskListId ? (
                <TaskItem
                  taskName={task.taskName}
                  status={task.status}
                  onButtonClick={() => handleButtonClick(task.taskId)}
                  onDelete={() => handleDelete(task.taskId)}
                  onCheckboxChange={() => handleTaskCheckbox(task.taskId)}
                />
              ) : null}
            </Box>
          ))}
        </Box>
      ))}

      <ConfirmationAlert
        open={open}
        onClose={() => setOpen(false)}
        onConfirm={handleAlertConfirm}
      />
    </Container>
  );
};

export default TaskList;
