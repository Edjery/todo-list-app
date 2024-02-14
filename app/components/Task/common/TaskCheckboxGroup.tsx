import React, { useEffect, useState } from "react";
import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
} from "../../../lib/MUI-core-v4";
import ObjectStatus from "./interface/IObjectStatus";

interface Props {
  list: ObjectStatus[];
  setValue: (value: ObjectStatus[]) => void;
}

const TaskCheckboxGroup = ({ list, setValue }: Props) => {
  const [items, setItems] = useState<ObjectStatus[]>(list);

  useEffect(() => {
    setItems(list);
  }, [list]);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    const index = items.findIndex((item) => item.name === name);
    if (index !== -1) {
      const updatedItems = [...items];
      updatedItems[index] = { ...updatedItems[index], status: checked };
      setItems(updatedItems);
      setValue(updatedItems);
    }
  };

  return (
    <Box component="div" className="flex justify-center mt-3">
      {items.map((item) => (
        <Box key={item.name}>
          <FormControl>
            <FormControlLabel
              label={item.name}
              control={
                <Checkbox
                  name={item.name}
                  color="primary"
                  checked={item.status}
                  onChange={handleCheckboxChange}
                />
              }
            />
          </FormControl>
        </Box>
      ))}
    </Box>
  );
};

export default TaskCheckboxGroup;
