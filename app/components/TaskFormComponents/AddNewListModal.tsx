import { Box, Button, Dialog, DialogContent } from "../../lib/MUI-core-v4";
import TaskFormText from "./TaskFormText";

interface Props {
  listFormState: boolean;
  setListFormState: (value: boolean) => void;
  handleAlert: () => void;
  handleTaskFormState: () => void;
}

const AddNewListModal = ({
  listFormState,
  setListFormState,
  handleAlert,
  handleTaskFormState,
}: Props) => {
  const listFormClose = () => {
    setListFormState(false);
  };

  const listFormConfirm = () => {
    listFormClose();
    handleTaskFormState();
    handleAlert();
  };

  return (
    <Dialog open={listFormState} onClose={listFormClose} maxWidth="lg">
      <DialogContent>
        <TaskFormText placeholder="List Name"></TaskFormText>
      </DialogContent>
      <Box>
        <Box component="div" className="flex justify-between m-5">
          <Button variant="outlined" onClick={listFormClose}>
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
