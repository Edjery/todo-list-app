import { Box, TextareaAutosize } from "../../lib/MUI-core-v4";

interface Props {
  placeholder: string;
}

const TaskFormTextArea = ({ placeholder }: Props) => {
  return (
    <Box className="mt-2">
      <TextareaAutosize placeholder={placeholder} className="size-full" />
    </Box>
  );
};

export default TaskFormTextArea;
