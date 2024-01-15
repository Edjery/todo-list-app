import {
  Box,
  Button,
  Dialog,
  DialogContent,
  Typography,
} from "../../../lib/MUI-core-v4";

const message = "Are you sure?";

interface Props {
  open: boolean;
  onConfirm: () => void;
  onClose: () => void;
}

const ConfirmationAlert = ({ open, onClose, onConfirm }: Props) => {
  return (
    <Box>
      <Dialog open={open} onClose={onClose} maxWidth="lg">
        <DialogContent>
          <Typography>{message}</Typography>
        </DialogContent>
        <Box component="div" className="flex">
          <Box component="div" className="flex justify-end mx-5 mb-3">
            <Button variant="contained" color="default" onClick={onClose}>
              Cancel
            </Button>
          </Box>
          <Box component="div" className="flex justify-end mx-5 mb-3">
            <Button variant="contained" color="secondary" onClick={onConfirm}>
              Delete
            </Button>
          </Box>
        </Box>
      </Dialog>
    </Box>
  );
};

export default ConfirmationAlert;
