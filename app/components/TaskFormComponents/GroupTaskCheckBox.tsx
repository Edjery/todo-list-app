import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
} from "../../lib/MUI-core-v4";

interface Props {
  list: string[];
}

const GroupTaskCheckBox = ({ list }: Props) => {
  return (
    <Box component="div" className="flex justify-center mt-3">
      {list.map((listItem) => (
        <FormControl>
          <FormControlLabel
            control={<Checkbox color="primary" />}
            label={listItem}
            value={listItem}
          />
        </FormControl>
      ))}
    </Box>
  );
};

export default GroupTaskCheckBox;
