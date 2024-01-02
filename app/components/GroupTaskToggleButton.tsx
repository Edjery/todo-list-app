import { ToggleButton, ToggleButtonGroup } from "../lib/MUI-lab-v4";
import DateDialogBox from "./DateDialogBox";

interface Props {
  schedValue: string;
  handleSchedValue: (
    event: React.MouseEvent<HTMLElement>,
    newValue: string | null
  ) => void;
}

const GroupTaskToggleButton = ({ schedValue, handleSchedValue }: Props) => {
  return (
    <>
      <ToggleButtonGroup
        value={schedValue}
        exclusive
        onChange={handleSchedValue}
      >
        <ToggleButton value="Today">Just Today</ToggleButton>
        <ToggleButton value="Date">
          <DateDialogBox />
        </ToggleButton>
        <ToggleButton value="Custom">Custom Schedule</ToggleButton>
      </ToggleButtonGroup>
    </>
  );
};

export default GroupTaskToggleButton;
