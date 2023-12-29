import { Box, TextField } from "../lib/MUI-core-v4";

interface Props {
  placeholder: string;
}

const AddTaskInputs = ({ placeholder }: Props) => {
  return (
    <Box className="mt-2">
      <TextField placeholder={placeholder} fullWidth />
    </Box>
  );
};

export default AddTaskInputs;
