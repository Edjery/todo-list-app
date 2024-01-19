import { ITaskData } from "@/app/data/taskData";
import { ITaskListData } from "@/app/data/taskListData";
import { useState } from "react";
import { Box, Container, Typography } from "../../lib/MUI-core-v4";
import ConfirmationAlert from "./common/ConfirmationAlert";
import TaskItem from "./common/TaskItem";

interface Props {
  taskListData: ITaskListData[];
  displayedTaskData: ITaskData[];
  onEditTaskData: (taskId: string) => void;
  onTaskCheckboxChange: (taskId: string) => void;
  onTaskDataChange: (value: ITaskData[]) => void;
}

const TaskList = ({
  taskListData,
  displayedTaskData,
  onEditTaskData,
  onTaskCheckboxChange,
  onTaskDataChange,
}: Props) => {
  const [open, setOpen] = useState(false);
  const [confirmValue, setConfirmValue] = useState("");

  const handleDelete = (taskId: string): void => {
    setConfirmValue(taskId);
    setOpen(true);
  };

  const handleAlertConfirm = (): void => {
    const updatedTaskData = displayedTaskData.filter(
      (task) => task.taskId !== confirmValue
    );
    onTaskDataChange(updatedTaskData);
    setOpen(false);
  };

  return (
    <Container maxWidth="sm" className="mt-10">
      {taskListData.map((taskList) => (
        <Box key={taskList.taskListId} className="mt-5">
          <Typography variant="h6">{taskList.taskListName}</Typography>
          {displayedTaskData.map((task) => (
            <Box key={task.taskId}>
              {taskList.taskListId === task.taskListId ? (
                <TaskItem
                  taskName={task.taskName}
                  status={task.status}
                  onEdit={() => onEditTaskData(task.taskId)}
                  onDelete={() => handleDelete(task.taskId)}
                  onCheckboxChange={() => onTaskCheckboxChange(task.taskId)}
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
