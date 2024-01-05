import { useState } from "react";
import { ToggleButton } from "../lib/MUI-lab-v4";

interface Props {
  label: string;
  onChange: (checked: boolean) => void;
}

const ToggleableButton = ({ label, onChange }: Props) => {
  const [checked, setChecked] = useState(false);

  const handleChange = () => {
    const newChecked = !checked;
    setChecked(newChecked);
    onChange(newChecked);
  };

  return (
    <ToggleButton selected={checked} onChange={handleChange}>
      {label}
    </ToggleButton>
  );
};

export default ToggleableButton;
