import {
  Box,
  Checkbox,
  FormControlLabel,
  IconButton,
} from "@/app/lib/MUI-core-v4";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

interface Props {
  name: string;
  status: boolean;
  onCheckboxChange: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

const TaskItem = ({
  name,
  status,
  onCheckboxChange,
  onEdit,
  onDelete,
}: Props) => {
  return (
    <Box component="div" className="flex justify-between">
      <FormControlLabel
        control={
          <Checkbox
            color="primary"
            checked={status}
            name={name}
            onChange={onCheckboxChange}
          />
        }
        label={name}
      />

      <Box>
        <IconButton className="justify-self-end" onClick={onEdit}>
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
