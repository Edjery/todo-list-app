import { Box, TextField } from "../../lib/MUI-core-v4";

interface Props {
  placeholder: string;
}

const TaskFormText = ({ placeholder }: Props) => {
  return (
    <Box className="mt-2">
      <TextField placeholder={placeholder} fullWidth />
    </Box>
  );
};

export default TaskFormText;
