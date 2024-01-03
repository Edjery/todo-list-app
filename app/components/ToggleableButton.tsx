import { useState } from "react";
import { ToggleButton } from "../lib/MUI-lab-v4";

interface Props {
  label: string;
}

const ToggleableButton = ({ label }: Props) => {
  const [checked, setChecked] = useState(false);
  const handleChange = () => {
    setChecked(!checked);
  };

  return (
    <>
      <ToggleButton selected={checked} onChange={handleChange}>
        {label}
      </ToggleButton>
    </>
  );
};

export default ToggleableButton;
