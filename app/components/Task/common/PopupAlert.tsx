import {
  Box,
  Button,
  Dialog,
  DialogContent,
  Typography,
} from "../../../lib/MUI-core-v4";
import ITaskIndex from "../ITaskIndex";

const createMessage = "Task has been successfully created";
const editMessage = "Task has been successfully edited";

interface Props {
  open: boolean;
  onClose: () => void;
  task: ITaskIndex | undefined;
}

const PopupAlert = ({ open, onClose, task }: Props) => {
  return (
    <Box>
      <Dialog open={open} onClose={onClose} maxWidth="lg">
        <DialogContent>
          <Typography>
            {task === undefined ? createMessage : editMessage}
          </Typography>
        </DialogContent>
        <Box>
          <Box component="div" className="flex justify-end mx-5 mb-3">
            <Button variant="contained" color="primary" onClick={onClose}>
              Confirm
            </Button>
          </Box>
        </Box>
      </Dialog>
    </Box>
  );
};

export default PopupAlert;
