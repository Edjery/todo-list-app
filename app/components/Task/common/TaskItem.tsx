import { ITask } from "@/app/hooks/addTaskUseStateHandlers";
import {
  Box,
  Checkbox,
  FormControlLabel,
  IconButton,
} from "@/app/lib/MUI-core-v4";
import EditIcon from "@material-ui/icons/Edit";

interface Props {
  taskName: string;
  status: boolean;
  taskListItemIndex: number;
  taskIndex: number;
  onCheckboxChange: (taskListItemIndex: number, taskIndex: number) => void;
  onTaskFormOpen: () => void;
  onSelectTask: (value: ITask | undefined) => void;
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
  const onHandleButtonClick = (): void => {
    onTaskFormOpen();
    onSelectTask({
      taskListIndex: taskListItemIndex,
      taskIndex: taskIndex,
    });
  };
  const onFormControlChange = (): void => {
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
            onChange={onFormControlChange}
          />
        }
        label={taskName}
      />

      <IconButton className="justify-self-end" onClick={onHandleButtonClick}>
        <EditIcon />
      </IconButton>
    </Box>
  );
};

export default TaskItem;
