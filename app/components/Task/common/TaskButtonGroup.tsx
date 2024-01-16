import { Box, TextField } from "@/app/lib/MUI-core-v4";
import { ToggleButton, ToggleButtonGroup } from "@/app/lib/MUI-lab-v4";
import dayjs from "dayjs";
import { FormikErrors } from "formik";
import React, { ChangeEvent, useState } from "react";
import ToggleableButton from "../../common/ToggleableButton";
import { ITaskForm } from "../form/ITaskForm";
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
  const [input, setInput] = useState<string>(values.dueDate);
  console.log("values.dueDate:", values.dueDate);

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

          <ToggleButton value="Date">Due Date</ToggleButton>
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

      {scheduleValue === "Date" && (
        <Box className="flex justify-center">
          <TextField
            type="date"
            onChange={(event: ChangeEvent<HTMLInputElement>): void => {
              const value = event.target.value;
              const dateFormatted = dayjs(value).format("MM/DD/YYYY");
              setInput(value);
              setFieldValue("dueDate", value);
              console.log("value:", dateFormatted);
            }}
            value={input}
          />
        </Box>
      )}
    </>
  );
};

export default TaskButtonGroup;
