import { ChangeEvent, useState } from "react";

export const useCustomSchedule = () => {
  const [checkedIntervalItems, setCheckedIntervalItems] = useState<string[]>(
    []
  );
  const [checkedDaysItems, setCheckedDaysItems] = useState<string[]>([]);

  const handleCheckedIntervals = (items: string[]) => {
    setCheckedIntervalItems(items);
    return items;
  };

  const handleCheckedDays = (items: string[]) => {
    setCheckedDaysItems(items);
    return items;
  };

  return {
    checkedIntervalItems,
    checkedDaysItems,
    handleCheckedIntervals,
    handleCheckedDays,
  };
};

export const useDueDate = (initialValue: string = "") => {
  const [dueDate, setDueDate] = useState<string>(initialValue);

  const handleDueDate = (date: string) => {
    setDueDate(date);
    return date;
  };

  return { dueDate, setDueDate, handleDueDate };
};

export const usePriority = (initialState: boolean = false) => {
  const [priorityValue, setPriorityValue] = useState<boolean>(initialState);

  const togglePriority = () => {
    const newValue = !priorityValue;
    setPriorityValue(newValue);
    return newValue;
  };

  return { priorityValue, togglePriority };
};

export const useScheduleValueAndHandlers = (initialValue: string = "Today") => {
  const [scheduleValue, setScheduleValue] = useState<string>(initialValue);

  const handleScheduleValue = (
    event: React.MouseEvent<HTMLElement>,
    newValue: string | null
  ) => {
    if (newValue !== null) {
      setScheduleValue(newValue);
    }
  };

  return { scheduleValue, setScheduleValue, handleScheduleValue };
};

export const useTaskListChoice = (initialValue: string) => {
  const [taskListChoice, setTaskListChoice] = useState<string | unknown>(
    initialValue
  );

  const handleTaskListChoice = (
    event: ChangeEvent<{ value: string | unknown }>
  ) => {
    const newValue = event.target.value;
    setTaskListChoice(newValue);
    return newValue;
  };

  return { taskListChoice, setTaskListChoice, handleTaskListChoice };
};
