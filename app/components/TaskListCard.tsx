"use client";

import EditIcon from "@material-ui/icons/Edit";
import todolistDummy from "../data/todolist-dummy";
import {
  Box,
  Checkbox,
  Container,
  IconButton,
  Typography,
} from "../lib/MUI-core-v4";

const TaskListCard = () => {
  const { results: taskList } = todolistDummy;

  return (
    <Container maxWidth="sm" className="mt-10">
      {taskList.map((taskListItem) => (
        <div key={taskListItem.Title} className="mt-5">
          <Typography variant="h6">{taskListItem.Title}</Typography>
          {taskListItem.Tasks.map((task) => (
            <Box
              key={task.taskTitle}
              component="div"
              className="flex justify-between"
            >
              <Box component="div" className="flex">
                <Checkbox color="primary" value={task.status} />
                <Typography className="self-center">
                  {task.taskTitle}
                </Typography>
              </Box>
              <IconButton className="justify-self-end">
                <EditIcon />
              </IconButton>
            </Box>
          ))}
        </div>
      ))}
    </Container>
  );
};

export default TaskListCard;
