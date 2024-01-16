import SortIcon from "@material-ui/icons/Sort";
import { useState } from "react";
import { Box, IconButton, Menu } from "../../../lib/MUI-core-v4";
import { ToggleButton, ToggleButtonGroup } from "../../../lib/MUI-lab-v4";

interface Props {
  filterList: string[];
  filterValue: string;
  onFilterChange: (
    event: React.MouseEvent<HTMLElement>,
    newValue: string
  ) => void;
}

const FilterButton = ({ filterList, filterValue, onFilterChange }: Props) => {
  const [anchor, setAnchor] = useState<null | HTMLElement>(null);

  const onModalOpen = (event: React.MouseEvent<HTMLButtonElement>): void => {
    setAnchor(event.currentTarget);
  };

  const onModalClose = (): void => {
    setAnchor(null);
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
          onChange={(
            event: React.MouseEvent<HTMLElement>,
            newValue: string
          ) => {
            onFilterChange(event, newValue);
            if (newValue == null) {
              onFilterChange(event, filterList[0]);
            }
          }}
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
