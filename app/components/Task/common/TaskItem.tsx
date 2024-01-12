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
  onButtonClick: () => void;
  onCheckboxChange: () => void;
}

const TaskItem = ({
  taskName,
  status,
  onButtonClick,
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

      <IconButton className="justify-self-end" onClick={onButtonClick}>
        <EditIcon />
      </IconButton>
    </Box>
  );
};

export default TaskItem;
