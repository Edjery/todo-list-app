import React, { useState } from "react";
import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
} from "../../lib/MUI-core-v4";

interface Props {
  list: string[];
  onChange: (checkedItems: string[]) => void;
}

const GroupTaskCheckBox = ({ list, onChange }: Props) => {
  const [checkedItems, setCheckedItems] = useState<string[]>([]);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (event.target.checked) {
      setCheckedItems([...checkedItems, value]);
    } else {
      setCheckedItems(checkedItems.filter((item) => item !== value));
    }
    onChange([...checkedItems, value]);
  };

  return (
    <Box component="div" className="flex justify-center mt-3">
      {list.map((listItem) => (
        <FormControl key={listItem}>
          <FormControlLabel
            control={
              <Checkbox
                color="primary"
                onChange={handleCheckboxChange}
                checked={checkedItems.includes(listItem)}
                value={listItem}
              />
            }
            label={listItem}
          />
        </FormControl>
      ))}
    </Box>
  );
};

export default GroupTaskCheckBox;
