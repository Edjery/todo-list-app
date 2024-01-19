import { sortList } from "@/app/data/dataMatrix";
import SortIcon from "@material-ui/icons/Sort";
import { useState } from "react";
import { Box, IconButton, Menu } from "../../../lib/MUI-core-v4";
import { ToggleButton, ToggleButtonGroup } from "../../../lib/MUI-lab-v4";

interface Props {
  sortValue: string;
  onSortChange: (
    event: React.MouseEvent<HTMLElement>,
    newValue: string
  ) => void;
}

const SortButton = ({ sortValue, onSortChange }: Props) => {
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
          value={sortValue}
          exclusive
          onChange={(
            event: React.MouseEvent<HTMLElement>,
            newValue: string
          ) => {
            onSortChange(event, newValue);
            if (newValue == null) {
              onSortChange(event, sortList[0]);
            }
          }}
          orientation="vertical"
        >
          {sortList.map((sortListItemName) => (
            <ToggleButton key={sortListItemName} value={sortListItemName}>
              {sortListItemName}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </Menu>
    </Box>
  );
};

export default SortButton;
