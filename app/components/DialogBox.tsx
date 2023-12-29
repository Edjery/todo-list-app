import { ChangeEvent, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "../lib/MUI-core-v4";

const DialogBox = () => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState<string>();

  const handleChange = () => {
    setOpen(!open);
  };

  const handleTextInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  const formatDate = (inputDateString: string) => {
    const date = new Date(inputDateString);
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    return date.toLocaleDateString("en-US", options);
  };

  return (
    <>
      <Button variant="outlined" onClick={handleChange}>
        {input ? formatDate(input) : "Due Date"}
      </Button>
      <Dialog open={open} onClose={handleChange}>
        <DialogTitle>Fill the form</DialogTitle>
        <DialogContent>
          <TextField
            type="date"
            onChange={handleTextInputChange}
            value={input}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleChange} color="primary">
            Cancel
          </Button>
          <Button onClick={handleChange} color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DialogBox;
