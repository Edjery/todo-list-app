import { useState } from "react";
import { Box } from "../lib/MUI-core-v4";
import DialogBox from "./DialogBox";
import GroupTaskCheckBox from "./GroupTaskCheckBox";
import GroupTaskToggleButton from "./GroupTaskToggleButton";
import TaskToggleButton from "./TaskToggleButton";

const AddTaskScheduleButtons = () => {
  const [value, setValue] = useState<string>("Today");
  const intervals = ["Daily", "Monthly", "Weekly", "Monthly", "Yearly"];
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Sunday",
  ];

  const handleValue = (
    event: React.MouseEvent<HTMLElement>,
    newValue: string | null
  ) => {
    if (newValue !== null) {
      setValue(newValue);
    }
  };

  return (
    <>
      <Box component="div" className="flex justify-center mt-5">
        <DialogBox />
        <TaskToggleButton />
        <GroupTaskToggleButton value={value} handleValue={handleValue} />
      </Box>

      {value === "Custom" && (
        <Box>
          <GroupTaskCheckBox list={intervals} />
          <GroupTaskCheckBox list={days} />
        </Box>
      )}
    </>
  );
};

export default AddTaskScheduleButtons;
