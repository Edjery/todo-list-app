import { Box } from "../lib/MUI-core-v4";
import GroupTaskCheckBox from "./GroupTaskCheckBox";
import GroupTaskToggleButton from "./GroupTaskToggleButton";
import TaskToggleButton from "./TaskToggleButton";

interface Props {
  schedValue: string;
  handleSchedValue: (
    event: React.MouseEvent<HTMLElement>,
    newValue: string | null
  ) => void;
}

const AddTaskScheduleButtons = ({ schedValue, handleSchedValue }: Props) => {
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

  return (
    <>
      <Box component="div" className="flex justify-center my-5">
        <GroupTaskToggleButton
          schedValue={schedValue}
          handleSchedValue={handleSchedValue}
        />
        <TaskToggleButton />
      </Box>

      {schedValue === "Custom" && (
        <Box>
          <GroupTaskCheckBox list={intervals} />
          <GroupTaskCheckBox list={days} />
        </Box>
      )}
    </>
  );
};

export default AddTaskScheduleButtons;
