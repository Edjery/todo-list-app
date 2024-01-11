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

  const handleCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const { checked, name } = event.target;
    let updatedItems: string[];

    if (checked) {
      updatedItems = [...items, name];
    } else {
      updatedItems = items.filter((item) => item !== name);
    }

    setItems(updatedItems);
    onChange(updatedItems);
  };

  return (
    <Box component="div" className="flex justify-center mt-3">
      {list.map((listItem) => (
        <>
          <FormControl key={listItem}>
            <FormControlLabel
              label={listItem}
              control={
                <Checkbox
                  name={listItem}
                  color="primary"
                  onChange={handleCheckboxChange}
                  checked={items.includes(listItem)}
                  value={items.includes(listItem)}
                />
              }
            />
          </FormControl>
        </>
      ))}
    </Box>
  );
};

export default TaskCheckboxGroup;
