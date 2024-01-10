import React, { useState } from "react";
import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
} from "../../../lib/MUI-core-v4";

interface Props {
  value: {
    choice: string;
    status: boolean;
  }[];
  list: string[];
  onChange: (checkedItems: string[]) => void;
}

const TaskCheckboxGroup = ({ value, list, onChange }: Props) => {
  const objectsWithTrueStatus = value.filter((item) => item.status === true);
  const choicesWithTrueStatus = objectsWithTrueStatus.map(
    (item) => item.choice
  );

  const [items, setItems] = useState<string[]>(choicesWithTrueStatus);

  const onCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
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
                name={listItem}
                checked={items.includes(listItem)}
                value={items.includes(listItem)}
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
