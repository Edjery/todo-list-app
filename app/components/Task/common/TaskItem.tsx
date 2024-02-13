import {
  Box,
  Checkbox,
  FormControlLabel,
  IconButton,
} from "@/app/lib/MUI-core-v4";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { useState } from "react";

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
  const [isChecked, setIsChecked] = useState(status);
  return (
    <Box component="div" className="flex justify-between">
      <FormControlLabel
        control={
          <Checkbox
            color="primary"
            checked={isChecked}
            name={name}
            onChange={() => {
              setIsChecked(!isChecked);
              onCheckboxChange();
            }}
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
