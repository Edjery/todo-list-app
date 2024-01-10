import SearchIcon from "@material-ui/icons/Search";
import { Box, IconButton } from "../../../lib/MUI-core-v4";

interface Props {
  onClick: () => void;
}

const SearchButton = ({ onClick }: Props) => {
  return (
    <Box>
      <IconButton onClick={onClick}>
        <SearchIcon />
      </IconButton>
    </Box>
  );
};

export default SearchButton;
