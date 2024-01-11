import todolistDummy from "@/app/data/todolist-dummy";
import { useState } from "react";
import { Container, Typography } from "../../lib/MUI-core-v4";
import ITaskIndex from "./ITaskIndex";
import TaskItem from "./common/TaskItem";

const taskList = todolistDummy.results;

interface Props {
  onSelectTask: (value: ITaskIndex | undefined) => void;
  onTaskFormOpen: () => void;
}

const TaskList = ({ onSelectTask, onTaskFormOpen }: Props) => {
  const [taskListData, setTaskListData] = useState(taskList);

  const handleCheckboxChange = (
    taskListItemIndex: number,
    taskIndex: number
  ): void => {
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
            <TaskItem
              key={task.taskName}
              taskName={task.taskName}
              status={task.status}
              taskListItemIndex={taskListItemIndex}
              taskIndex={taskIndex}
              onCheckboxChange={handleCheckboxChange}
              onTaskFormOpen={onTaskFormOpen}
              onSelectTask={onSelectTask}
            />
          ))}
        </div>
      ))}
    </Container>
  );
};

export default TaskList;
