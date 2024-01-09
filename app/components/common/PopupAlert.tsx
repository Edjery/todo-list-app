import {
  Box,
  Button,
  Dialog,
  DialogContent,
  Typography,
} from "../../lib/MUI-core-v4";

interface Props {
  message: string;
  open: boolean;
  close: () => void;
}

const PopupAlert = ({ message, open, close }: Props) => {
  return (
    <Box>
      <Dialog open={open} onClose={close} maxWidth="lg">
        <DialogContent>
          <Typography>{message}</Typography>
        </DialogContent>
        <Box>
          <Box component="div" className="flex justify-end mx-5 mb-3">
            <Button variant="contained" color="primary" onClick={close}>
              Confirm
            </Button>
          </Box>
        </Box>
      </Dialog>
    </Box>
  );
};

export default PopupAlert;
