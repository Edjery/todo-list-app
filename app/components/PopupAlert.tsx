import {
  Box,
  Button,
  Dialog,
  DialogContent,
  Typography,
} from "../lib/MUI-core-v4";

interface Props {
  alertMessage: string;
  alertState: boolean;
  handleAlert: () => void;
}

const PopupAlert = ({ alertMessage, alertState, handleAlert }: Props) => {
  return (
    <Box>
      <Dialog open={alertState} onClose={handleAlert} maxWidth="lg">
        <DialogContent>
          <Typography>{alertMessage}</Typography>
        </DialogContent>
        <Box>
          <Box component="div" className="flex justify-end mx-5 mb-3">
            <Button variant="contained" color="primary" onClick={handleAlert}>
              Confirm
            </Button>
          </Box>
        </Box>
      </Dialog>
    </Box>
  );
};

export default PopupAlert;
