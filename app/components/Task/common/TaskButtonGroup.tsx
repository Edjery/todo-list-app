import { Box } from "@/app/lib/MUI-core-v4";
import { ToggleButton, ToggleButtonGroup } from "@/app/lib/MUI-lab-v4";
import { FormikErrors } from "formik";
import React from "react";
import ToggleableButton from "../../common/ToggleableButton";
import { ITaskForm } from "../form/ITaskForm";
import DueDateDialog from "./DueDateDialog";
import TaskCheckboxGroup from "./TaskCheckboxGroup";

const intervals = ["Daily", "Weekly", "Monthly", "Yearly"];
const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const handleButtonChanges = (
  newValue: string[],
  prevValue: { choice: string; status: boolean }[]
): {
  choice: string;
  status: boolean;
}[] => {
  for (let object of prevValue) {
    for (let index in newValue) {
      if (object.choice === newValue[index]) {
        object.status = true;
      }
    }
  }
  return prevValue;
};

interface Props {
  scheduleValue: string;
  setScheduleValue: (value: React.SetStateAction<string>) => void;
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined
  ) => Promise<void | FormikErrors<ITaskForm>>;
  values: ITaskForm;
}

const TaskButtonGroup = ({
  scheduleValue,
  setScheduleValue,
  setFieldValue,
  values,
}: Props) => {
  return (
    <>
      <Box component="div" className="flex justify-center my-5">
        <ToggleButtonGroup
          value={scheduleValue}
          exclusive
          onChange={(
            event: React.MouseEvent<HTMLElement>,
            newValue: string | null
          ) => {
            if (newValue !== null) {
              setScheduleValue(newValue);
              setFieldValue("schedule", newValue);
            }
          }}
        >
          <ToggleButton value="Today">Just Today</ToggleButton>
          <ToggleButton value="Date">
            <DueDateDialog
              value={values.dueDate}
              onChange={(value) => {
                setFieldValue("date", value);
              }}
            />
          </ToggleButton>
          <ToggleButton value="Custom">Custom Schedule</ToggleButton>
        </ToggleButtonGroup>
        <ToggleableButton
          value={values.priority}
          label={"Priority"}
          onChange={(item) => {
            setFieldValue("priority", item);
          }}
        />
      </Box>

      {scheduleValue === "Custom" && (
        <>
          <TaskCheckboxGroup
            value={values.RecurringTimeInterval}
            list={intervals}
            onChange={(items) => {
              const recurringTimeInterval = handleButtonChanges(
                items,
                values.RecurringTimeInterval
              );
              setFieldValue("RecurringTimeInterval", recurringTimeInterval);
            }}
          />
          <TaskCheckboxGroup
            value={values.RecurringTimeInterval}
            list={days}
            onChange={(items) => {
              const daysOfTheWeek = handleButtonChanges(
                items,
                values.DaysOfTheWeek
              );
              setFieldValue("DaysOfTheWeek", daysOfTheWeek);
            }}
          />
        </>
      )}
    </>
  );
};

export default TaskButtonGroup;
