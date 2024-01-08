import SearchIcon from "@material-ui/icons/Search";
import { useState } from "react";
import { Box, Button, Dialog, IconButton, TextField } from "../lib/MUI-core-v4";
import { Field, Form, Formik } from "formik";
import searchSchema from "../schemas/searchSchema";

const initialValues = { search: "" };

const SeachButton = () => {
  const [open, setOpen] = useState(false);
  const handleState = () => {
    setOpen(!open);
  };
  return (
    <Box>
      <IconButton onClick={handleState}>
        <SearchIcon />
      </IconButton>

      <Dialog open={open} onClose={handleState} maxWidth="lg">
        <Formik
          initialValues={initialValues}
          validationSchema={searchSchema}
          onSubmit={(values) => {
            console.log(values);
            handleState();
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
  );
};

export default SeachButton;
