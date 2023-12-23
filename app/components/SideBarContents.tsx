import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import InboxIcon from "@material-ui/icons/Inbox";
import { Container, Divider, Drawer, IconButton } from "../lib/MUI-v4";
import ItemList, { Item } from "./ItemList";

interface Props {
  open: boolean;
  handleDrawerClose: () => void;
}

const SideBarContents = ({ open, handleDrawerClose }: Props) => {
  const items: Item[] = [
    {
      label: "Home Page",
      icon: <InboxIcon />,
    },
    {
      label: "Calendar",
      icon: <InboxIcon />,
    },
    {
      label: "Charts",
      icon: <InboxIcon />,
    },
    {
      label: "Themes",
      icon: <InboxIcon />,
    },
    {
      label: "Category",
      icon: <InboxIcon />,
    },
  ];

  return (
    <Drawer anchor="left" open={open}>
      <Container>
        <IconButton onClick={handleDrawerClose}>
          <ChevronLeftIcon />
        </IconButton>
      </Container>
      <Divider />
      <ItemList items={items} />
      <Divider />
    </Drawer>
  );
};

export default SideBarContents;
