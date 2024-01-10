import { Box, Container, Toolbar } from "../../lib/MUI-core-v4";
import AddTaskButton from "./AddTaskButton";
import FilterButton from "./FilterButton";
import SearchButton from "./SearchButton";

interface Props {
  onTaskFormOpen: () => void;
  onSearchOpen: () => void;
}

const TaskHeader = ({ onTaskFormOpen, onSearchOpen }: Props) => {
  return (
    <Container maxWidth="md">
      <Toolbar className="flex justify-center mt-10 shadow-md rounded-full">
        <SearchButton onClick={onSearchOpen} />

        <Box className="mx-32">
          <AddTaskButton onClick={onTaskFormOpen} />
        </Box>

        <FilterButton />
      </Toolbar>
    </Container>
  );
};

export default TaskHeader;
