import { ITask } from "@/app/data/taskData";
import { ITaskList } from "@/app/data/taskListData";
import { useState } from "react";
import { Box, Container, Typography } from "../../lib/MUI-core-v4";
import ConfirmationAlert from "./common/ConfirmationAlert";
import TaskItem from "./common/TaskItem";

interface Props {
  list: ITaskList[];
  tasks: ITask[];
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
        <Box key={listName.id} className="mt-5">
          <Typography variant="h6">{listName.name}</Typography>
          {tasks.map((task) => (
            <Box key={task.id}>
              {listName.id === task.taskListId ? (
                <TaskItem
                  name={task.name}
                  status={task.status}
                  onCheckboxChange={() => onTaskStatusUpdate(task.id)}
                  onEdit={() => onTaskDataEdit(task.id)}
                  onDelete={() => {
                    setId(task.id);
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
