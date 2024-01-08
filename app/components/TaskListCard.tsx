"use client";

import EditIcon from "@material-ui/icons/Edit";
import { useState } from "react";
import { useAlertState } from "../hooks/addTaskUseStateHandlers";
import {
  Box,
  Checkbox,
  Container,
  FormControlLabel,
  IconButton,
  Typography,
} from "../lib/MUI-core-v4";
import EditTaskModal from "./EditTaskModal";
import PopupAlert from "./PopupAlert";

const initialValues = {
  taskTitle: undefined,
  newTaskTitle: undefined,
  taskList: undefined,
  status: undefined,
};
const taskList = [
  {
    Title: "Today",
    Tasks: [
      {
        taskTitle: "Check Email",
        status: true,
      },
      {
        taskTitle: "Buy groceries",
        status: false,
      },
      {
        taskTitle: "Clean room",
        status: false,
      },
      {
        taskTitle: "Do laundry",
        status: false,
      },
    ],
  },
  {
    Title: "Tomorrow",
    Tasks: [
      {
        taskTitle: "Check Email",
        status: false,
      },
      {
        taskTitle: "Buy groceries",
        status: false,
      },
      {
        taskTitle: "Clean room",
        status: false,
      },
      {
        taskTitle: "Do laundry",
        status: false,
      },
    ],
  },
  {
    Title: "Unsorted",
    Tasks: [
      {
        taskTitle: "Check Email",
        status: false,
      },
      {
        taskTitle: "Buy groceries",
        status: false,
      },
      {
        taskTitle: "Clean room",
        status: false,
      },
      {
        taskTitle: "Do laundry",
        status: false,
      },
    ],
  },
  {
    Title: "List 1",
    Tasks: [
      {
        taskTitle: "Check Email",
        status: false,
      },
      {
        taskTitle: "Buy groceries",
        status: false,
      },
      {
        taskTitle: "Clean room",
        status: false,
      },
      {
        taskTitle: "Do laundry",
        status: false,
      },
    ],
  },
];

const TaskListCard = () => {
  const { alertState, handleAlertState } = useAlertState();
  const [taskListData, setTaskListData] = useState(taskList);
  const [editState, setEditState] = useState(false);
  const [taskId, setTaskId] = useState({ taskListId: 0, taskId: 0 });

  const handleEditState = () => {
    setEditState(!editState);
  };

  const handleCheckboxChange = (
    taskListItemIndex: number,
    taskIndex: number
  ) => {
    const updatedTaskList = [...taskListData];
    updatedTaskList[taskListItemIndex].Tasks[taskIndex].status =
      !updatedTaskList[taskListItemIndex].Tasks[taskIndex].status;
    setTaskListData(updatedTaskList);
  };

  return (
    <Container maxWidth="sm" className="mt-10">
      {taskListData.map((taskListItem, taskListItemIndex) => (
        <div key={taskListItem.Title} className="mt-5">
          <Typography variant="h6">{taskListItem.Title}</Typography>
          {taskListItem.Tasks.map((task, taskIndex) => (
            <Box
              key={task.taskTitle}
              component="div"
              className="flex justify-between"
            >
              <FormControlLabel
                control={
                  <Checkbox
                    color="primary"
                    checked={task.status}
                    name={task.taskTitle}
                    onChange={() =>
                      handleCheckboxChange(taskListItemIndex, taskIndex)
                    }
                  />
                }
                label={task.taskTitle}
              />

              <IconButton
                className="justify-self-end"
                onClick={() => {
                  handleEditState();
                  setTaskId({
                    taskListId: taskListItemIndex,
                    taskId: taskIndex,
                  });
                }}
              >
                <EditIcon />
              </IconButton>
            </Box>
          ))}
        </div>
      ))}
      <Box>
        <EditTaskModal
          editState={editState}
          handleEditState={handleEditState}
          handleAlertState={handleAlertState}
          taskId={taskId}
        />
        <PopupAlert
          alertMessage="Task has been successfully edited"
          alertState={alertState}
          handleAlertState={handleAlertState}
        />
      </Box>
    </Container>
  );
};

export default TaskListCard;
