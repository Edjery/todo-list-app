import SearchIcon from "@material-ui/icons/Search";
import { Box, IconButton } from "../../lib/MUI-core-v4";

interface Props {
  onOpen: () => void;
}

const SearchButton = ({ onOpen }: Props) => {
  return (
    <Box>
      <IconButton onClick={onOpen}>
        <SearchIcon />
      </IconButton>
    </Box>
  );
};

export default SearchButton;
