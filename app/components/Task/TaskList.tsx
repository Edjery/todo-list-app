import ITask from "@/app/services/Interfaces/ITask";
import taskListService from "@/app/services/TaskListSevice";
import { useState } from "react";
import { Box, Container, Typography } from "../../lib/MUI-core-v4";
import ConfirmationAlert from "./common/ConfirmationAlert";
import TaskItem from "./common/TaskItem";

interface Props {
  tasks: ITask[];
  onStatusUpdate: (taskId: string) => void;
  onEdit: (taskId: string) => void;
  onDelete: (taskId: string) => void;
}

const TaskList = ({ tasks, onStatusUpdate, onEdit, onDelete }: Props) => {
  const list = taskListService.getAll();
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
                  onCheckboxChange={() => onStatusUpdate(task.id)}
                  onEdit={() => onEdit(task.id)}
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
          onDelete(id);
          setOpen(false);
        }}
      />
    </Container>
  );
};

export default TaskList;
