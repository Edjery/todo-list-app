import { Box, Button, Dialog, TextField } from "@/app/lib/MUI-core-v4";
import searchSchema from "@/app/schemas/searchSchema";
import { Field, Form, Formik } from "formik";

interface Props {
  open: boolean;
  onClose: () => void;
  onSearch: (searchTerm: string) => void;
}

const SearchFormDialog = ({ open, onClose, onSearch }: Props) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg">
      <Formik
        initialValues={{ search: "" }}
        validationSchema={searchSchema}
        onSubmit={(values) => {
          console.log("searching for:", values.search);
          onSearch(values.search);
          onClose();
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
  );
};

export default SearchFormDialog;
