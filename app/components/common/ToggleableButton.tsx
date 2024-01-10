import { useState } from "react";
import { ToggleButton } from "../../lib/MUI-lab-v4";

interface Props {
  value: boolean;
  label: string;
  onChange: (checked: boolean) => void;
}

const ToggleableButton = ({ value, label, onChange }: Props) => {
  const [checked, setChecked] = useState(value);

  const handleChange = (): void => {
    const newChecked = !checked;
    setChecked(newChecked);
    onChange(newChecked);
  };

  return (
    <ToggleButton selected={checked} onChange={handleChange} value={checked}>
      {label}
    </ToggleButton>
  );
};

export default ToggleableButton;
