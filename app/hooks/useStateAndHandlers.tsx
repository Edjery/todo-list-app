import { useState, useCallback, ChangeEvent } from "react";

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

export const useChosenListAndHandlers = (
  initialValue: string | unknown = ""
) => {
  const [chosenList, setChosenList] = useState<string | unknown>(initialValue);

  const handleChosenList = useCallback(
    (taskListChoice: string | unknown) => {
      setChosenList(taskListChoice);
    },
    [setChosenList]
  );

  return { chosenList, setChosenList, handleChosenList };
};

export const useTaskListChoice = (initialValue: string) => {
  const [taskListChoice, setTaskListChoice] = useState<string | unknown>(
    initialValue
  );

  const handleTaskListChoice = (
    event: ChangeEvent<{ value: string | unknown }>
  ) => {
    setTaskListChoice(event.target.value);
  };

  return { taskListChoice, setTaskListChoice, handleTaskListChoice };
};

export const useListName = (initialValue: string = "") => {
  const [listName, setListName] = useState<string>(initialValue);

  const handleListName = (name: string) => {
    setListName(name);
  };

  return { listName, setListName, handleListName };
};
