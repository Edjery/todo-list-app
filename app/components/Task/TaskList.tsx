import { ITaskData } from "@/app/data/taskData";
import { ITaskListData } from "@/app/data/taskListData";
import { useState } from "react";
import { Box, Container, Typography } from "../../lib/MUI-core-v4";
import ConfirmationAlert from "./common/ConfirmationAlert";
import TaskItem from "./common/TaskItem";

interface Props {
  list: ITaskListData[];
  tasks: ITaskData[];
  onTaskStatusUpdate: (taskId: string) => void;
  onTaskDataEdit: (taskId: string) => void;
  onTaskDataDelete: (taskId: string) => void;
}

const TaskList = ({
  list,
  tasks,
  onTaskStatusUpdate,
  onTaskDataEdit,
  onTaskDataDelete,
}: Props) => {
  const [open, setOpen] = useState(false);
  const [id, setId] = useState("");

  return (
    <Container maxWidth="sm" className="mt-10">
      {list.map((listName) => (
        <Box key={listName.taskListId} className="mt-5">
          <Typography variant="h6">{listName.taskListName}</Typography>
          {tasks.map((task) => (
            <Box key={task.taskId}>
              {listName.taskListId === task.taskListId ? (
                <TaskItem
                  name={task.taskName}
                  status={task.status}
                  onCheckboxChange={() => onTaskStatusUpdate(task.taskId)}
                  onEdit={() => onTaskDataEdit(task.taskId)}
                  onDelete={() => {
                    setId(task.taskId);
                    setOpen(true);
                  }}
                />
              ) : null}
            </Box>
          ))}
        </Box>
      ))}

      <ConfirmationAlert
        open={open}
        onClose={() => setOpen(false)}
        onConfirm={() => {
          onTaskDataDelete(id);
          setOpen(false);
        }}
      />
    </Container>
  );
};

export default TaskList;
