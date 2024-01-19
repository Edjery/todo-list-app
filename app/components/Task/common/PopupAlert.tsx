import {
  Box,
  Button,
  Dialog,
  DialogContent,
  Typography,
} from "../../../lib/MUI-core-v4";

interface Props {
  message: string;
  open: boolean;
  onClose: () => void;
}

const PopupAlert = ({ message, open, onClose }: Props) => {
  return (
    <Box>
      <Dialog open={open} onClose={onClose} maxWidth="lg">
        <DialogContent>
          <Typography>{message}</Typography>
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
