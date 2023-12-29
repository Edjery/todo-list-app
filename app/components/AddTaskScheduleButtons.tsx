import { Box } from "../lib/MUI-core-v4";
import DialogBox from "./DialogBox";
import GroupTaskToggleButton from "./GroupTaskToggleButton";
import TaskToggleButton from "./TaskToggleButton";

const AddTaskScheduleButtons = () => {
  return (
    <Box component="div" className="flex justify-center mt-5">
      <DialogBox />
      <TaskToggleButton />
      <GroupTaskToggleButton />
    </Box>
  );
};

export default AddTaskScheduleButtons;
