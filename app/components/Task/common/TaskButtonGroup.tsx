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
    if (newValue.includes(object.choice)) {
      object.status = true;
    } else {
      object.status = false;
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

          <ToggleButton value="Custom">Custom Schedule</ToggleButton>

          <ToggleButton value="Date">
            <DueDateDialog
              value={values.dueDate}
              onChange={(value) => {
                setFieldValue("dueDate", value);
              }}
            />
          </ToggleButton>
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
            value={values.timeInterval}
            list={intervals}
            onChange={(items) => {
              const newTimeInterval = handleButtonChanges(
                items,
                values.timeInterval
              );
              setFieldValue("timeInterval", newTimeInterval);
            }}
          />
          <TaskCheckboxGroup
            value={values.dayInterval}
            list={days}
            onChange={(items) => {
              const newDayInterval = handleButtonChanges(
                items,
                values.dayInterval
              );
              setFieldValue("dayInterval", newDayInterval);
            }}
          />
        </>
      )}
    </>
  );
};

export default TaskButtonGroup;
