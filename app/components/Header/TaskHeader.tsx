import { Box, Container, Toolbar } from "../../lib/MUI-core-v4";
import ITask from "../Task/ITask";
import AddTaskButton from "./common/AddTaskButton";
import FilterButton from "./common/FilterButton";
import SearchButton from "./common/SearchButton";

interface Props {
  onTaskFormOpen: () => void;
  onSearchOpen: () => void;
  onSelectTask: (value: ITask | undefined) => void;
}

const TaskHeader = ({ onTaskFormOpen, onSearchOpen, onSelectTask }: Props) => {
  return (
    <Container maxWidth="md">
      <Toolbar className="flex justify-center mt-10 shadow-md rounded-full">
        <SearchButton onClick={onSearchOpen} />

        <Box className="mx-32">
          <AddTaskButton
            onClick={() => {
              onTaskFormOpen();
              onSelectTask(undefined);
            }}
          />
        </Box>

        <FilterButton />
      </Toolbar>
    </Container>
  );
};

export default TaskHeader;
