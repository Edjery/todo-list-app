import {
  Box,
  Container,
  DialogContent,
  TextField,
  TextareaAutosize,
} from "@/app/lib/MUI-core-v4";
import addTaskSchema from "@/app/schemas/addTaskSchema";
import { Field, Form, Formik } from "formik";
import TaskButtonGroup from "../common/TaskButtonGroup";
import TaskFormFooter from "../common/TaskFormFooter";
import { ITaskForm } from "./ITaskForm";

interface Props {
  initForm: () => ITaskForm;
  onFormSubmit: (values: ITaskForm) => void;
  onAlertOpen: () => void;
  onClose: () => void;
}

const TaskForm = ({ onAlertOpen, initForm, onFormSubmit, onClose }: Props) => {
  const initialValues = initForm();

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={addTaskSchema}
      onSubmit={(values) => {
        console.log("values:", values);
        onClose();
        onAlertOpen();
        onFormSubmit(values);
      }}
    >
      {({ setFieldValue, isSubmitting, errors, touched, values }) => (
        <Form>
          <DialogContent>
            <Container maxWidth="md" className="p-4">
              <Box className="mt-2">
                <Field
                  type="text"
                  name="taskName"
                  placeholder="Task Name"
                  as={TextField}
                  fullWidth
                  error={errors.taskName && touched.taskName ? true : false}
                  helperText={
                    errors.taskName && touched.taskName ? errors.taskName : ""
                  }
                />
              </Box>
              <Box className="mt-2">
                <Field
                  name="taskDescription"
                  placeholder="Task Description (Optional)"
                  as={TextareaAutosize}
                  className="size-full"
                />
              </Box>

              <TaskButtonGroup values={values} setFieldValue={setFieldValue} />

              <Box className="mt-2">
                <Field
                  name="tags"
                  placeholder="#Tags (Optional)"
                  as={TextareaAutosize}
                  className="size-full"
                />
              </Box>
            </Container>
          </DialogContent>

          <TaskFormFooter
            values={values}
            setFieldValue={setFieldValue}
            isSubmitting={isSubmitting}
            onClose={onClose}
          />
        </Form>
      )}
    </Formik>
  );
};

export default TaskForm;
