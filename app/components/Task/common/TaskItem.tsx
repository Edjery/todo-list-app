import {
  Box,
  Checkbox,
  FormControlLabel,
  IconButton,
} from "@/app/lib/MUI-core-v4";
import EditIcon from "@material-ui/icons/Edit";
import ITaskIndex from "../ITaskIndex";

interface Props {
  taskName: string;
  status: boolean;
  taskListItemIndex: number;
  taskIndex: number;
  onCheckboxChange: (taskListItemIndex: number, taskIndex: number) => void;
  onTaskFormOpen: () => void;
  onSelectTask: (value: ITaskIndex | undefined) => void;
}

const TaskItem = ({
  taskName,
  status,
  taskListItemIndex,
  taskIndex,
  onCheckboxChange,
  onTaskFormOpen,
  onSelectTask,
}: Props) => {
  const handleButtonClick = (): void => {
    onTaskFormOpen();
    onSelectTask({
      taskListIndex: taskListItemIndex,
      taskIndex: taskIndex,
    });
  };
  const handleFormControlChange = (): void => {
    onCheckboxChange(taskListItemIndex, taskIndex);
  };

  return (
    <Box component="div" className="flex justify-between">
      <FormControlLabel
        control={
          <Checkbox
            color="primary"
            checked={status}
            name={taskName}
            onChange={handleFormControlChange}
          />
        }
        label={taskName}
      />

      <IconButton className="justify-self-end" onClick={handleButtonClick}>
        <EditIcon />
      </IconButton>
    </Box>
  );
};

export default TaskItem;
