import { ITaskData } from "@/app/data/taskData";
import { ITaskListData } from "@/app/data/taskListData";
import { useState } from "react";
import { Box, Container, Typography } from "../../lib/MUI-core-v4";
import ConfirmationAlert from "./common/ConfirmationAlert";
import TaskItem from "./common/TaskItem";

interface Props {
  taskListData: ITaskListData[];
  displayedTaskData: ITaskData[];
  onTaskCheckboxChange: (taskId: string) => void;
  onEditTaskData: (taskId: string) => void;
  onDeleteTaskData: (taskId: string) => void;
}

const TaskList = ({
  taskListData,
  displayedTaskData,
  onEditTaskData,
  onTaskCheckboxChange,
  onDeleteTaskData,
}: Props) => {
  const [open, setOpen] = useState(false);
  const [id, setId] = useState("");

  const handleDelete = (taskId: string): void => {
    setId(taskId);
    setOpen(true);
  };

  const handleAlertConfirm = (): void => {
    onDeleteTaskData(id);
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
