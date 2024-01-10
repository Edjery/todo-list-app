import { Box, Button, Dialog, TextField } from "@/app/lib/MUI-core-v4";
import searchSchema from "@/app/schemas/searchSchema";
import { Field, Form, Formik } from "formik";

const initialValues = { search: "" };

interface Props {
  open: boolean;
  onClose: () => void;
}

const SearchFormDialog = ({ open, onClose }: Props) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg">
      <Formik
        initialValues={initialValues}
        validationSchema={searchSchema}
        onSubmit={(values) => {
          console.log(values);
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
