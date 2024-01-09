import {
  Box,
  Button,
  Dialog,
  DialogContent,
  Typography,
} from "../../lib/MUI-core-v4";

interface Props {
  alertMessage: string;
  alertOpen: boolean;
  onAlertClose: () => void;
}

const PopupAlert = ({ alertMessage, alertOpen, onAlertClose }: Props) => {
  return (
    <Box>
      <Dialog open={alertOpen} onClose={onAlertClose} maxWidth="lg">
        <DialogContent>
          <Typography>{alertMessage}</Typography>
        </DialogContent>
        <Box>
          <Box component="div" className="flex justify-end mx-5 mb-3">
            <Button variant="contained" color="primary" onClick={onAlertClose}>
              Confirm
            </Button>
          </Box>
        </Box>
      </Dialog>
    </Box>
  );
};

export default PopupAlert;
