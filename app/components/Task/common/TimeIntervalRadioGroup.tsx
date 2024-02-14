import { intervals } from "@/app/data/dataMatrix";
import {
  Box,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@/app/lib/MUI-core-v4";
import { useEffect, useState } from "react";

interface Props {
  currentInterval: string;
  setValue: (items: string) => void;
}

const TimeIntervalRadioGroup = ({ setValue, currentInterval }: Props) => {
  const [input, setInput] = useState(currentInterval);
  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    setInput(event.target.value);
  };

  useEffect(() => {
    setInput(currentInterval);
  }, [currentInterval]);

  return (
    <Box component="div" className="flex justify-center mt-3">
      <FormControl component="fieldset">
        <RadioGroup row onChange={handleRadioChange} value={input}>
          {intervals.map((interval) => (
            <FormControlLabel
              key={interval}
              value={interval}
              control={<Radio color="primary" />}
              label={interval}
            />
          ))}
        </RadioGroup>
      </FormControl>
    </Box>
  );
};

export default TimeIntervalRadioGroup;
