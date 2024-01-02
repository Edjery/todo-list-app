import { Box, Button, Dialog, DialogContent } from "../lib/MUI-core-v4";
import TaskFormText from "./TaskFormText";

interface Props {
  listForm: boolean;
  handleListFormConfirm: () => void;
  handleListFormCancel: () => void;
}

const AddNewList = ({
  listForm,
  handleListFormConfirm,
  handleListFormCancel,
}: Props) => {
  return (
    <Box>
      <Dialog open={listForm} onClose={handleListFormCancel} maxWidth="lg">
        <DialogContent>
          <TaskFormText placeholder="List Name"></TaskFormText>
        </DialogContent>
        <Box>
          <Box component="div" className="flex justify-between m-5">
            <Button variant="outlined" onClick={handleListFormCancel}>
              Cancel
            </Button>
            <Box component="div" className="flex">
              <Button
                variant="contained"
                color="primary"
                onClick={handleListFormConfirm}
              >
                Confirm
              </Button>
            </Box>
          </Box>
        </Box>
      </Dialog>
    </Box>
  );
};

export default AddNewList;
