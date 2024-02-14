"use client";

import ITask from "@/app/services/Interfaces/ITask";
import ITaskList from "@/app/services/Interfaces/ITaskList";
import taskListService from "@/app/services/TaskListSevice";
import CloseIcon from "@material-ui/icons/Close";
import { useEffect, useState } from "react";
import { Box, Button, Container, Typography } from "../../lib/MUI-core-v4";
import ConfirmationAlert from "./common/ConfirmationAlert";
import TaskItem from "./common/TaskItem";
import { Skeleton } from "@material-ui/lab";

interface Props {
  tasks: ITask[];
  onStatusUpdate: (taskId: number) => void;
  onTaskEdit: (taskId: number) => void;
  onTaskDelete: (taskId: number) => void;
}

const TaskList = ({
  tasks,
  onStatusUpdate,
  onTaskEdit,
  onTaskDelete,
}: Props) => {
  const [taskLists, setTaskLists] = useState<ITaskList[]>([]);
  const [loading, setLoading] = useState(true);
  const [id, setId] = useState(0);
  const [open, setOpen] = useState(false);
  const [taskId, setTaskId] = useState(0);
  const [openTaskDeleteModal, setOpenTaskDeleteModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(false);
        setTaskLists(await taskListService.getAll());
        console.log("Data has been successfully fetched");
      } catch (error) {
        setLoading(false);
        console.error("Error loading data:", error);
        throw error;
      }
    };

    fetchData();
  }, [tasks]);

  if (loading) {
    return (
      <Container maxWidth="sm" className="mt-10">
        {[...Array(3)].map((_, index) => (
          <Box key={index} className="mt-5">
            <Box className="flex justify-between items-center">
              <Skeleton height={100} width={750} />
            </Box>
            {[...Array(5)].map((_, index) => (
              <Box key={index} component="div" className="flex justify-between">
                <Skeleton height={50} width={750} animation="wave" />
              </Box>
            ))}
          </Box>
        ))}
      </Container>
    );
  }
  const handleDelete = async (id: number) => {
    await taskListService.remove(id);
    setTaskLists(await taskListService.getAll());
  };

  return (
    <Container maxWidth="sm" className="mt-10">
      {taskLists.map((listName) => (
        <Box key={listName.id} className="mt-5">
          <Box className="flex justify-between items-center">
            <Typography variant="h6">{listName.name}</Typography>
            <Button
              onClick={() => {
                setId(listName.id);
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
