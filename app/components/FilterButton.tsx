import SortIcon from "@material-ui/icons/Sort";
import { useAnchor, useFilterValue } from "../hooks/addTaskUseStateHandlers";
import { Box, IconButton, Menu } from "../lib/MUI-core-v4";
import { ToggleButton, ToggleButtonGroup } from "../lib/MUI-lab-v4";

const FilterButton = () => {
  const defualtFilterList = "Default";
  const filterList = ["Default", "Date Created", "Name"];

  const { anchor, openModal, closeModal } = useAnchor();
  const { filterValue, handleFilterValue } = useFilterValue(defualtFilterList);

  return (
    <Box>
      <IconButton onClick={openModal}>
        <SortIcon />
      </IconButton>

      <Menu
        id="simple-menu"
        anchorEl={anchor}
        keepMounted
        open={Boolean(anchor)}
        onClose={closeModal}
      >
        <ToggleButtonGroup
          value={filterValue}
          exclusive
          onChange={handleFilterValue}
          orientation="vertical"
        >
          {filterList.map((filterListItem) => (
            <ToggleButton key={filterListItem} value={filterListItem}>
              {filterListItem}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </Menu>
    </Box>
  );
};

export default FilterButton;
