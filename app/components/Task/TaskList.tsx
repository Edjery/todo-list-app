import ITask from "@/app/services/Interfaces/ITask";
import ITaskList from "@/app/services/Interfaces/ITaskList";
import taskListService from "@/app/services/TaskListSevice";
import CloseIcon from "@material-ui/icons/Close";
import { useEffect, useState } from "react";
import { Box, Button, Container, Typography } from "../../lib/MUI-core-v4";
import ConfirmationAlert from "./common/ConfirmationAlert";
import TaskItem from "./common/TaskItem";

interface Props {
  tasks: ITask[];
  onStatusUpdate: (taskId: string) => void;
  onTaskEdit: (taskId: string) => void;
  onTaskDelete: (taskId: string) => void;
}

const TaskList = ({
  tasks,
  onStatusUpdate,
  onTaskEdit,
  onTaskDelete,
}: Props) => {
  const [taskLists, setTaskLists] = useState<ITaskList[]>([]);
  const [open, setOpen] = useState(false);
  const [id, setId] = useState(0);
  const [openTaskDeleteModal, setOpenTaskDeleteModal] = useState(false);
  const [taskId, setTaskId] = useState("");

  useEffect(() => {
    const fetchTaskLists = async () => {
      try {
        const lists = await taskListService.getAll();
        setTaskLists(lists);
      } catch (error) {
        console.error("Error fetching task lists:", error);
      }
    };
    fetchTaskLists();
  }, [taskListService.taskLists]);

  const handleDelete = async (id: number) => {
    await taskListService.remove(id);
  };

  return (
    <Container maxWidth="sm" className="mt-10">
      {taskLists.map((listName) => (
        <Box key={listName.id} className="mt-5">
          <Box className="flex justify-between items-center">
            <Typography variant="h6">{listName.name}</Typography>
            <Button
              onClick={() => {
                setId(parseInt(listName.id));
                setOpen(true);
              }}
            >
              <CloseIcon />
            </Button>
          </Box>
          {tasks.map((task) => (
            <Box key={task.id}>
              {listName.id === task.taskListId ? (
                <TaskItem
                  name={task.name}
                  status={task.status}
                  onCheckboxChange={() => onStatusUpdate(task.id)}
                  onEdit={() => onTaskEdit(task.id)}
                  onDelete={() => {
                    setTaskId(task.id);
                    setOpenTaskDeleteModal(true);
                  }}
                />
              ) : null}
            </Box>
          ))}
        </Box>
      ))}

      <ConfirmationAlert
        open={openTaskDeleteModal}
        onClose={() => setOpenTaskDeleteModal(false)}
        onConfirm={() => {
          onTaskDelete(taskId);
          setOpenTaskDeleteModal(false);
        }}
      />

      <ConfirmationAlert
        open={open}
        onClose={() => setOpen(false)}
        onConfirm={() => {
          handleDelete(id);
          setOpen(false);
        }}
      />
    </Container>
  );
};

export default TaskList;
