import { useState } from "react";
import { ToggleButton } from "../lib/MUI-lab-v4";

const TaskToggleButton = () => {
  const [checked, setChecked] = useState(false);
  const handleChange = () => {
    setChecked(!checked);
  };

  return (
    <>
      <ToggleButton selected={checked} onChange={handleChange}>
        Priority
      </ToggleButton>
    </>
  );
};

export default TaskToggleButton;
