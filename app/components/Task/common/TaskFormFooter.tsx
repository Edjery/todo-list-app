import { defaultTaskListChoice } from "@/app/data/dataMatrix";
import { ITaskList } from "@/app/data/taskListData";
import {
  Box,
  Button,
  FormControl,
  MenuItem,
  Select,
  TextField,
} from "@/app/lib/MUI-core-v4";
import { Field, FormikErrors } from "formik";
import { ChangeEvent, useState } from "react";
import { ITaskForm } from "../form/ITaskForm";

interface Props {
  values: ITaskForm;
  taskListData: ITaskList[];
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined
  ) => Promise<void | FormikErrors<ITaskForm>>;
  isSubmitting: boolean;
  onClose: () => void;
}

const TaskFormFooter = ({
  values,
  taskListData,
  setFieldValue,
  isSubmitting,
  onClose,
}: Props) => {
  const [taskListChoice, setTaskListChoice] = useState<string | unknown>(
    values.taskListName
  );
  const submitButton = values.edit ? "Edit Task" : "Add Task";

  return (
    <Box component="div" className="flex justify-between m-5">
      <Button variant="outlined" onClick={onClose}>
        Cancel
      </Button>

      <Box component="div" className="flex">
        {values.schedule === "Custom" && (
          <>
            <Box className="mx-5 self-center">
              {taskListChoice === defaultTaskListChoice && (
                <Field
                  type="text"
                  name="taskListName"
                  placeholder="list name"
                  as={TextField}
                />
              )}
            </Box>

            <Box className="mr-5">
              <FormControl variant="outlined">
                <Select
                  value={taskListChoice}
                  onChange={(event: ChangeEvent<{ value: unknown }>) => {
                    setFieldValue("taskListName", event.target.value);
                    setTaskListChoice(event.target.value);
                  }}
                >
                  <MenuItem
                    key={defaultTaskListChoice}
                    value={defaultTaskListChoice}
                  >
                    {defaultTaskListChoice}
                  </MenuItem>
                  {taskListData.map((taskListItem) => (
                    <MenuItem key={taskListItem.id} value={taskListItem.name}>
                      {taskListItem.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </>
        )}

        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={isSubmitting}
        >
          {submitButton}
        </Button>
      </Box>
    </Box>
  );
};

export default TaskFormFooter;
