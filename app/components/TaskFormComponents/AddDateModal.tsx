import { ChangeEvent, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "../../lib/MUI-core-v4";

interface Props {
  onChange: (value: string) => void;
}

const AddDateModal = ({ onChange }: Props) => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState<string>();

  const handleChange = () => {
    setOpen(!open);
  };

  const handleDateInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInput(value);
    onChange(formatDate(value));
    console.log(formatDate(value));
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
      <Typography variant="inherit" onClick={handleChange}>
        {input ? formatDate(input) : "Due Date"}
      </Typography>
      <Dialog open={open} onClose={handleChange}>
        <DialogTitle>Fill the form</DialogTitle>
        <DialogContent>
          <TextField
            type="date"
            onChange={handleDateInputChange}
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

export default AddDateModal;
