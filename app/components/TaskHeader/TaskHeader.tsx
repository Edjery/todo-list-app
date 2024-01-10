import {
  useAlertState,
  useSearchState,
} from "@/app/hooks/addTaskUseStateHandlers";
import searchSchema from "@/app/schemas/searchSchema";
import { Field, Form, Formik } from "formik";
import {
  Box,
  Button,
  Container,
  Dialog,
  TextField,
  Toolbar,
} from "../../lib/MUI-core-v4";
import TaskForm from "../Task/TaskForm";
import PopupAlert from "../common/PopupAlert";
import AddTaskButton from "./AddTaskButton";
import FilterButton from "./FilterButton";
import SearchButton from "./SearchButton";

// Search buttons stuff
const initialSearchValues = { search: "" };

interface Props {
  taskFormOpen: boolean;
  onTaskFormOpen: () => void;
  onTaskFormClose: () => void;
}

const TaskHeader = ({
  taskFormOpen,
  onTaskFormOpen,
  onTaskFormClose,
}: Props) => {
  const { alertOpen, onAlertOpen, onAlertClose } = useAlertState();
  const { searchOpen, onSearchOpen, onSearchClose } = useSearchState();

  return (
    <Container maxWidth="md">
      <Toolbar className="flex justify-center mt-10 shadow-md rounded-full">
        <Box>
          <SearchButton onClick={onSearchOpen} />

          <Dialog open={searchOpen} onClose={onSearchClose} maxWidth="lg">
            <Formik
              initialValues={initialSearchValues}
              validationSchema={searchSchema}
              onSubmit={(values) => {
                console.log(values);
                onSearchClose();
              }}
            >
              {({ isSubmitting, errors, touched }) => (
                <Form>
                  <Box className="flex m-5">
                    <Box className="mr-5">
                      <Field
                        type="text"
                        name="search"
                        placeholder="search"
                        as={TextField}
                        fullWidth
                        variant="outlined"
                        error={errors.search && touched.search ? true : false}
                        helperText={
                          errors.search && touched.search ? errors.search : ""
                        }
                      />
                    </Box>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      disabled={isSubmitting}
                    >
                      Search
                    </Button>
                  </Box>
                </Form>
              )}
            </Formik>
          </Dialog>
        </Box>

        <Box className="mx-32">
          <AddTaskButton onClick={onTaskFormOpen} />
          <TaskForm
            formOpen={taskFormOpen}
            onAlertOpen={onAlertOpen}
            onFormClose={onTaskFormClose}
          />

          <PopupAlert
            message="Task has been successfully created"
            open={alertOpen}
            onClose={onAlertClose}
          />
        </Box>

        <Box>
          <FilterButton />
        </Box>
      </Toolbar>
    </Container>
  );
};

export default TaskHeader;
