import SortIcon from "@material-ui/icons/Sort";
import {
  useAnchor,
  useFilterValue,
} from "../../../hooks/addTaskUseStateHandlers";
import { Box, IconButton, Menu } from "../../../lib/MUI-core-v4";
import { ToggleButton, ToggleButtonGroup } from "../../../lib/MUI-lab-v4";

const FilterButton = () => {
  const filterList = ["Default", "Date Created", "Name"];
  const defualtFilterList = filterList[0];

  const { anchor, onModalOpen, onModalClose } = useAnchor();
  const { filterValue, onFilterChange } = useFilterValue(defualtFilterList);

  return (
    <Box>
      <IconButton onClick={onModalOpen}>
        <SortIcon />
      </IconButton>

      <Menu
        id="simple-menu"
        anchorEl={anchor}
        keepMounted
        open={Boolean(anchor)}
        onClose={onModalClose}
      >
        <ToggleButtonGroup
          value={filterValue}
          exclusive
          onChange={onFilterChange}
          orientation="vertical"
        >
          {filterList.map((filterListItemName) => (
            <ToggleButton key={filterListItemName} value={filterListItemName}>
              {filterListItemName}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </Menu>
    </Box>
  );
};

export default FilterButton;
