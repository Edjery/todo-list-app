import todolistDummy from "@/app/data/todolistDummy";
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

const { results: taskList } = todolistDummy;

interface Props {
  onClose: () => void;
  scheduleValue: string;
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined
  ) => Promise<void | FormikErrors<ITaskForm>>;
  isSubmitting: boolean;
  submitButton: "Edit Task" | "Add Task";
  currentTaskListChoice: string;
  defaultTaskListChoice: string;
  tasklistChoiceValue: string;
  taskList: string[];
}

const TaskFormFooter = ({
  onClose,
  scheduleValue,
  setFieldValue,
  isSubmitting,
  submitButton,
  defaultTaskListChoice,
  currentTaskListChoice,
  tasklistChoiceValue,
  taskList,
}: Props) => {
  const [taskListChoice, setTaskListChoice] = useState<string | unknown>(
    currentTaskListChoice
  );
  return (
    <Box component="div" className="flex justify-between m-5">
      <Button variant="outlined" onClick={onClose}>
        Cancel
      </Button>

      <Box component="div" className="flex">
        {scheduleValue === "Custom" && (
          <>
            <Box className="mx-5 self-center">
              {taskListChoice === defaultTaskListChoice && (
                <Field
                  type="text"
                  name="taskList"
                  placeholder="list name"
                  as={TextField}
                  value={tasklistChoiceValue}
                />
              )}
            </Box>

            <Box className="mr-5">
              <FormControl variant="outlined">
                <Select
                  value={taskListChoice}
                  onChange={(event: ChangeEvent<{ value: unknown }>) => {
                    const { value } = event.target;
                    setTaskListChoice(value);
                    setFieldValue("taskList", value);
                  }}
                >
                  <MenuItem
                    key={defaultTaskListChoice}
                    value={defaultTaskListChoice}
                  >
                    {defaultTaskListChoice}
                  </MenuItem>
                  {taskList.map((taskListItem) => (
                    <MenuItem key={taskListItem} value={taskListItem}>
                      {taskListItem}
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
