import { ITaskData } from "@/app/data/taskData";
import { ITaskListData } from "@/app/data/taskListData";
import { useState } from "react";
import { Box, Container, Typography } from "../../lib/MUI-core-v4";
import ConfirmationAlert from "./common/ConfirmationAlert";
import TaskItem from "./common/TaskItem";

interface Props {
  taskListData: ITaskListData[];
  taskDataToDisplay: ITaskData[];
  onTaskStatusUpdate: (taskId: string) => void;
  onTaskDataEdit: (taskId: string) => void;
  onTaskDataDelete: (taskId: string) => void;
}

const TaskList = ({
  taskListData,
  taskDataToDisplay,
  onTaskStatusUpdate,
  onTaskDataEdit,
  onTaskDataDelete,
}: Props) => {
  const [open, setOpen] = useState(false);
  const [id, setId] = useState("");

  return (
    <Container maxWidth="sm" className="mt-10">
      {taskListData.map((taskList) => (
        <Box key={taskList.taskListId} className="mt-5">
          <Typography variant="h6">{taskList.taskListName}</Typography>
          {taskDataToDisplay.map((task) => (
            <Box>
              {taskList.taskListId === task.taskListId ? (
                <Box key={task.taskId}>
                  <TaskItem
                    taskName={task.taskName}
                    status={task.status}
                    onCheckboxChange={() => onTaskStatusUpdate(task.taskId)}
                    onEdit={() => onTaskDataEdit(task.taskId)}
                    onDelete={() => {
                      setId(task.taskId);
                      setOpen(true);
                    }}
                  />
                </Box>
              ) : null}
            </Box>
          ))}
        </Box>
      ))}

      <ConfirmationAlert
        open={open}
        onClose={() => setOpen(false)}
        onConfirm={(): void => {
          onTaskDataDelete(id);
          setOpen(false);
        }}
      />
    </Container>
  );
};

export default TaskList;
