import { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  Typography,
} from "../lib/MUI-core-v4";
import TaskFormText from "./TaskFormText";

interface Props {
  alertOpen: boolean;
  handleAlert: () => void;
}

const AddedNewTaskAlert = ({ alertOpen, handleAlert }: Props) => {
  return (
    <Box>
      <Dialog open={alertOpen} onClose={handleAlert} maxWidth="lg">
        <DialogContent>
          <Typography>Task has been successfully created</Typography>
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

export default AddedNewTaskAlert;
