import { ChangeEvent, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "../../../lib/MUI-core-v4";

const formatDate = (inputDateString: string) => {
  const date = new Date(inputDateString);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  return date.toLocaleDateString("en-US", options);
};

interface Props {
  value: string;
  onChange: (value: string) => void;
}

const DueDateDialog = ({ value, onChange }: Props) => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState<string>(value);

  const onOpen = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const handleDateInputChange = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    value = event.target.value;
    setInput(value);
    onChange(value);
  };

  return (
    <>
      <Typography variant="inherit" onClick={onOpen}>
        {input ? formatDate(input) : "Due Date"}
      </Typography>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Fill the form</DialogTitle>
        <DialogContent>
          <TextField
            type="date"
            onChange={handleDateInputChange}
            value={input}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              onClose();
              setInput(value);
            }}
            color="primary"
          >
            Cancel
          </Button>
          <Button onClick={onClose} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DueDateDialog;
