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
    const { value, checked } = event.target;
    let updatedItems: string[];

    if (checked) {
      updatedItems = [...checkedItems, value];
    } else {
      updatedItems = checkedItems.filter((item) => item !== value);
    }

    setCheckedItems(updatedItems);
    onChange(updatedItems);
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
