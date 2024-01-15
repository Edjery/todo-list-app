import {
  Box,
  Checkbox,
  FormControlLabel,
  IconButton,
} from "@/app/lib/MUI-core-v4";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

interface Props {
  taskName: string;
  status: boolean;
  onButtonClick: () => void;
  onDelete: () => void;
  onCheckboxChange: () => void;
}

const TaskItem = ({
  taskName,
  status,
  onButtonClick,
  onDelete,
  onCheckboxChange,
}: Props) => {
  return (
    <Box component="div" className="flex justify-between">
      <FormControlLabel
        control={
          <Checkbox
            color="primary"
            checked={status}
            name={taskName}
            onChange={onCheckboxChange}
          />
        }
        label={taskName}
      />

      <Box>
        <IconButton className="justify-self-end" onClick={onButtonClick}>
          <EditIcon />
        </IconButton>
        <IconButton className="justify-self-end" onClick={onDelete}>
          <DeleteIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default TaskItem;
