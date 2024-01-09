import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import InboxIcon from "@material-ui/icons/Inbox";
import { Container, Divider, Drawer, IconButton } from "../lib/MUI-core-v4";
import ItemList, { Item } from "./common/ItemList";

interface Props {
  open: boolean;
  onClose: () => void;
}

const SideBarContents = ({ open, onClose }: Props) => {
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
        <IconButton onClick={onClose}>
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
