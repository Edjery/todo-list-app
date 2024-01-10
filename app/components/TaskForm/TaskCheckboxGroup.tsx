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

const TaskCheckboxGroup = ({ list, onChange }: Props) => {
  const [items, setItems] = useState<string[]>([]);

  const onCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;
    let updatedItems: string[];

    if (checked) {
      updatedItems = [...items, value];
    } else {
      updatedItems = items.filter((item) => item !== value);
    }

    setItems(updatedItems);
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
                onChange={onCheckboxChange}
                checked={items.includes(listItem)}
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

export default TaskCheckboxGroup;
