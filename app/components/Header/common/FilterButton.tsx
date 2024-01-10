import SortIcon from "@material-ui/icons/Sort";
import { useState } from "react";
import { Box, IconButton, Menu } from "../../../lib/MUI-core-v4";
import { ToggleButton, ToggleButtonGroup } from "../../../lib/MUI-lab-v4";

const FilterButton = () => {
  const filterList = ["Default", "Date Created", "Name"];
  const defualtFilterList = filterList[0];

  const [anchor, setAnchor] = useState<null | HTMLElement>(null);
  const [filterValue, setFilterValue] = useState<string | unknown>(
    defualtFilterList
  );

  const onModalOpen = (event: React.MouseEvent<HTMLButtonElement>): void => {
    setAnchor(event.currentTarget);
  };

  const onModalClose = (): void => {
    setAnchor(null);
  };

  const onFilterChange = (
    event: React.MouseEvent<HTMLElement>,
    newValue: string
  ): void => {
    setFilterValue(newValue);
  };

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
