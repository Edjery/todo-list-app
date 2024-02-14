import { days } from "@/app/data/dataMatrix";
import { Box, TextField } from "@/app/lib/MUI-core-v4";
import { ToggleButton, ToggleButtonGroup } from "@/app/lib/MUI-lab-v4";
import dayjs from "dayjs";
import React, { ChangeEvent, useState } from "react";
import ToggleableButton from "../../common/ToggleableButton";
import ITaskForm from "../form/ITaskForm";
import TaskCheckboxGroup from "./TaskCheckboxGroup";
import TimeIntervalRadioGroup from "./TimeIntervalRadioGroup";
import ObjectStatus from "./interface/IObjectStatus";

interface Props {
  values: ITaskForm;
  setValue: (
    field: string,
    fieldValue: string | boolean | ObjectStatus[]
  ) => void;
}

const TaskButtonGroup = ({ values, setValue }: Props) => {
  const [input, setInput] = useState<string>(values.dueAt);

  const handleTimeIntervalChange = (items: string) => {
    setValue("timeInterval", items);

    if (items === "Daily") {
      const newDayIntervals = days.map((day) => ({
        name: day,
        status: true,
      }));

      setValue("dayIntervalData", newDayIntervals);
      handleDueDateChange("");
    } else if (items === "Weekly") {
      const currentDay = dayjs().format("dddd");
      const newDayIntervals = days.map((day) => ({
        name: day,
        status: day === currentDay,
      }));

      setValue("dayIntervalData", newDayIntervals);
      handleDueDateChange("");
    } else if (items === "Monthly") {
      const newDayIntervals = days.map((day) => ({
        name: day,
        status: false,
      }));

      setValue("dayIntervalData", newDayIntervals);
      handleDueDateChange(dayjs().format("YYYY-MM-DD"));
    } else if (items === "Yearly") {
      const newDayIntervals = days.map((day) => ({
        name: day,
        status: false,
      }));

      setValue("dayIntervalData", newDayIntervals);
      handleDueDateChange(dayjs().format("YYYY-MM-DD"));
    } else {
      const newDayIntervals = days.map((day) => ({
        name: day,
        status: false,
      }));

      setValue("dayIntervalData", newDayIntervals);
    }
  };

  const handleDayIntervalChange = (items: ObjectStatus[]) => {
    setValue("dayIntervalData", items);

    const trueCounts = items.filter((item) => item.status).length;

    let timeInterval: string;
    if (trueCounts === items.length) {
      timeInterval = "Daily";
    } else if (trueCounts === 1) {
      timeInterval = "Weekly";
    } else {
      timeInterval = "";
    }

    setValue("timeInterval", timeInterval);
  };

  const handleDueDateChange = (value: string): void => {
    setInput(value);
    setValue("dueAt", value);
  };

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
            if (newScheduleValue !== null)
              setValue("schedule", newScheduleValue);
          }}
        >
          <ToggleButton value="Today">Just Today</ToggleButton>
          <ToggleButton value="Custom">Custom Schedule</ToggleButton>
          <ToggleButton value="Date">Due Date</ToggleButton>
        </ToggleButtonGroup>
        <ToggleableButton
          value={values.priority}
          label={"Priority"}
          onChange={(item) => setValue("priority", item)}
        />
      </Box>

      {values.schedule === "Custom" && (
        <>
          <TimeIntervalRadioGroup
            currentInterval={values.timeInterval}
            setValue={handleTimeIntervalChange}
          />
          <TaskCheckboxGroup
            list={values.dayIntervalData}
            setValue={handleDayIntervalChange}
          />
        </>
      )}

      {values.schedule === "Date" && (
        <Box className="flex justify-center">
          <TextField
            type="date"
            onChange={(event: ChangeEvent<HTMLInputElement>): void =>
              handleDueDateChange(event.target.value)
            }
            value={input}
          />
        </Box>
      )}
    </>
  );
};

export default TaskButtonGroup;
