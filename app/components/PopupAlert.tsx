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
  handleAlertState: () => void;
}

const PopupAlert = ({ alertMessage, alertState, handleAlertState }: Props) => {
  return (
    <Box>
      <Dialog open={alertState} onClose={handleAlertState} maxWidth="lg">
        <DialogContent>
          <Typography>{alertMessage}</Typography>
        </DialogContent>
        <Box>
          <Box component="div" className="flex justify-end mx-5 mb-3">
            <Button
              variant="contained"
              color="primary"
              onClick={handleAlertState}
            >
              Confirm
            </Button>
          </Box>
        </Box>
      </Dialog>
    </Box>
  );
};

export default PopupAlert;
