import { Box, Container, Toolbar } from "../../lib/MUI-core-v4";
import AddTaskButton from "./common/AddTaskButton";
import SearchButton from "./common/SearchButton";
import SortButton from "./common/SortButton";

interface Props {
  onSearchOpen: () => void;
  onFormOpen: () => void;
  sortValue: string;
  onSortChange: (
    event: React.MouseEvent<HTMLElement>,
    newValue: string
  ) => void;
}

const TaskHeader = ({
  onSearchOpen,
  onFormOpen,
  sortValue,
  onSortChange,
}: Props) => {
  return (
    <Container maxWidth="md">
      <Toolbar className="flex justify-center mt-10 shadow-md rounded-full">
        <SearchButton onClick={onSearchOpen} />

        <Box className="mx-32">
          <AddTaskButton onClick={onFormOpen} />
        </Box>

        <SortButton sortValue={sortValue} onSortChange={onSortChange} />
      </Toolbar>
    </Container>
  );
};

export default TaskHeader;
