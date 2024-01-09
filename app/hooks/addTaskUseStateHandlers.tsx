import { ChangeEvent, useState } from "react";

export const useTaskFormState = (initialValue: boolean = false) => {
  const [taskFormOpen, setTaskFormOpen] = useState(initialValue);

  const onTaskFormOpen = () => {
    setTaskFormOpen(true);
  };

  const onTaskFormClose = () => {
    setTaskFormOpen(false);
  };

  return { taskFormOpen, setTaskFormOpen, onTaskFormOpen, onTaskFormClose };
};

export const useAlertState = (initialValue: boolean = false) => {
  const [alertOpen, setAlertOpen] = useState(initialValue);

  const onAlertOpen = () => {
    setAlertOpen(false);
  };

  const onAlertClose = () => {
    setAlertOpen(false);
  };

  return { alertOpen, setAlertOpen, onAlertOpen, onAlertClose };
};

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
      return newValue;
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

export const useFilterValue = (initialValue: string) => {
  const [filterValue, setFilterValue] = useState<string | unknown>(
    initialValue
  );

  const onFilterChange = (
    event: React.MouseEvent<HTMLElement>,
    newValue: string
  ) => {
    setFilterValue(newValue);
  };

  return { filterValue, setFilterValue, onFilterChange };
};

export const useAnchor = () => {
  const [anchor, setAnchor] = useState<null | HTMLElement>(null);

  const onModalOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchor(event.currentTarget);
  };

  const onModalClose = () => {
    setAnchor(null);
  };

  return { anchor, onModalOpen, onModalClose };
};
