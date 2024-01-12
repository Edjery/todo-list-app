import {
  Box,
  Button,
  Dialog,
  DialogContent,
  Typography,
} from "../../../lib/MUI-core-v4";

const createMessage = "Task has been successfully created";
const editMessage = "Task has been successfully edited";

interface Props {
  open: boolean;
  onClose: () => void;
  taskId: string | undefined;
}

const PopupAlert = ({ open, onClose, taskId }: Props) => {
  return (
    <Box>
      <Dialog open={open} onClose={onClose} maxWidth="lg">
        <DialogContent>
          <Typography>
            {taskId === undefined ? createMessage : editMessage}
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
