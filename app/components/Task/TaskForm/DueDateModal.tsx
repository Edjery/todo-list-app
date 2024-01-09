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

const defaultInput = "";

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
  onChange: (value: string) => void;
}

const DueDateModal = ({ onChange }: Props) => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState<string>(defaultInput);

  const onOpen = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const handleDateInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInput(value);
    onChange(formatDate(value));
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
              setInput(defaultInput);
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

export default DueDateModal;
