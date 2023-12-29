import { ToggleButton, ToggleButtonGroup } from "../lib/MUI-lab-v4";

interface Props {
  value: string;
  handleValue: (
    event: React.MouseEvent<HTMLElement>,
    newValue: string | null
  ) => void;
}

const GroupTaskToggleButton = ({ value, handleValue }: Props) => {
  return (
    <>
      <ToggleButtonGroup value={value} exclusive onChange={handleValue}>
        <ToggleButton value="Today">Just Today</ToggleButton>
        <ToggleButton value="Custom">Custom Schedule</ToggleButton>
      </ToggleButtonGroup>
    </>
  );
};

export default GroupTaskToggleButton;
