import { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  TextField,
} from "../../lib/MUI-core-v4";

interface Props {
  listFormState: boolean;
  listFormConfirm: () => void;
  handleListName: (value: string) => void;
  hideListForm: () => void;
}

const AddNewListModal = ({
  listFormState,
  handleListName,
  listFormConfirm,
  hideListForm,
}: Props) => {
  const [listName, setListName] = useState("");

  const handleListNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setListName(value);
    handleListName(value);
  };

  return (
    <Dialog open={listFormState} onClose={hideListForm} maxWidth="lg">
      <DialogContent>
        <Box className="mt-2">
          <TextField
            placeholder="List Name"
            fullWidth
            value={listName}
            onChange={handleListNameChange}
          />
        </Box>
      </DialogContent>
      <Box>
        <Box component="div" className="flex justify-between m-5">
          <Button variant="outlined" onClick={hideListForm}>
            Cancel
          </Button>
          <Box component="div" className="flex">
            <Button
              variant="contained"
              color="primary"
              onClick={listFormConfirm}
            >
              Confirm
            </Button>
          </Box>
        </Box>
      </Box>
    </Dialog>
  );
};

export default AddNewListModal;
