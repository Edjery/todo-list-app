import { useState } from "react";
import { ToggleButton, ToggleButtonGroup } from "../lib/MUI-lab-v4";

const GroupTaskToggleButton = () => {
  const [value, setValue] = useState<string>("Today");
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
      <ToggleButtonGroup value={value} exclusive onChange={handleValue}>
        <ToggleButton value="Today">Just Today</ToggleButton>
        <ToggleButton value="Custom">Custom Schedule</ToggleButton>
      </ToggleButtonGroup>
    </>
  );
};

export default GroupTaskToggleButton;
