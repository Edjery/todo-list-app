import { days, intervals } from "@/app/data/dataMatrix";
import { Box, TextField } from "@/app/lib/MUI-core-v4";
import { ToggleButton, ToggleButtonGroup } from "@/app/lib/MUI-lab-v4";
import { FormikErrors } from "formik";
import React, { ChangeEvent, useState } from "react";
import ToggleableButton from "../../common/ToggleableButton";
import ITaskForm from "../form/ITaskForm";
import TaskCheckboxGroup from "./TaskCheckboxGroup";

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
  values: ITaskForm;
  setValue: (
    field: string,
    fieldValue:
      | string
      | boolean
      | {
          choice: string;
          status: boolean;
        }[]
  ) => void;
}

const TaskButtonGroup = ({ values, setValue }: Props) => {
  const [input, setInput] = useState<string>(values.dueAt);

  return (
    <>
      <Box component="div" className="flex justify-center my-5">
        <ToggleButtonGroup
          value={values.schedule}
          exclusive
          onChange={(
            event: React.MouseEvent<HTMLElement>,
            newScheduleValue: string | null
          ) => {
            if (newScheduleValue !== null) {
              setValue("schedule", newScheduleValue);
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
            setValue("priority", item);
          }}
        />
      </Box>

      {values.schedule === "Custom" && (
        <>
          <TaskCheckboxGroup
            value={values.timeIntervalData}
            list={intervals}
            onChange={(items) => {
              const newTimeInterval = handleButtonChanges(
                items,
                values.timeIntervalData
              );
              setValue("timeIntervalData", newTimeInterval);
            }}
          />
          <TaskCheckboxGroup
            value={values.dayIntervalData}
            list={days}
            onChange={(items) => {
              const newDayInterval = handleButtonChanges(
                items,
                values.dayIntervalData
              );
              setValue("dayIntervalData", newDayInterval);
            }}
          />
        </>
      )}

      {values.schedule === "Date" && (
        <Box className="flex justify-center">
          <TextField
            type="date"
            onChange={(event: ChangeEvent<HTMLInputElement>): void => {
              const value = event.target.value;
              setInput(value);
              setValue("dueAt", value);
            }}
            value={input}
          />
        </Box>
      )}
    </>
  );
};

export default TaskButtonGroup;
