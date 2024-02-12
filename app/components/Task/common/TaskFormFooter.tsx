import { defaultTaskListChoice } from "@/app/data/dataMatrix";
import {
  Box,
  Button,
  FormControl,
  MenuItem,
  Select,
  TextField,
} from "@/app/lib/MUI-core-v4";
import ITaskList from "@/app/services/Interfaces/ITaskList";
import taskListService from "@/app/services/TaskListSevice";
import { Field, FormikErrors } from "formik";
import { ChangeEvent, useEffect, useState } from "react";
import ITaskForm from "../form/ITaskForm";

interface Props {
  values: ITaskForm;
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
  setFieldValue,
  isSubmitting,
  onClose,
}: Props) => {
  const [taskListChoice, setTaskListChoice] = useState<string | unknown>(
    values.taskList
  );
  const [taskListItems, setTaskListItems] = useState<ITaskList[]>([]);

  useEffect(() => {
    const fetchTaskListItems = async () => {
      try {
        const items = await taskListService.getAll();
        setTaskListItems(items);
      } catch (error) {
        console.error("Error fetching task list items:", error);
      }
    };
    fetchTaskListItems();
  }, []);

  const submitButtonText = values.id === undefined ? "Add Task" : "Edit Task";

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
                  name="taskList"
                  placeholder="list name"
                  as={TextField}
                />
              )}
            </Box>

            <Box className="mr-5">
              <FormControl variant="outlined">
                <Select
                  value={taskListChoice || defaultTaskListChoice}
                  onChange={(event: ChangeEvent<{ value: unknown }>) => {
                    setFieldValue("taskList", event.target.value);
                    setTaskListChoice(event.target.value);
                  }}
                >
                  <MenuItem
                    key={defaultTaskListChoice}
                    value={defaultTaskListChoice}
                  >
                    {defaultTaskListChoice}
                  </MenuItem>
                  {taskListItems.map((taskListItem: ITaskList) => (
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
          {submitButtonText}
        </Button>
      </Box>
    </Box>
  );
};

export default TaskFormFooter;
