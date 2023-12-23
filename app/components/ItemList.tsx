import { List, ListItem, ListItemIcon, ListItemText } from "../lib/MUI-v4";

export interface Item {
  label: string;
  icon: React.ReactElement;
}

interface Props {
  items: Item[];
}

const ItemList = ({ items }: Props) => {
  return (
    <List>
      {items.map((item) => (
        <ListItem button key={item.label}>
          <ListItemIcon> {item.icon}</ListItemIcon>
          <ListItemText primary={item.label} />
        </ListItem>
      ))}
    </List>
  );
};

export default ItemList;
