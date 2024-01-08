import { ChangeEvent, useState } from "react";

export const useTaskFormState = (initialValue: boolean = false) => {
  const [taskFormState, setTaskFormState] = useState(initialValue);

  const handleTaskFormState = () => {
    const newValue = !taskFormState;
    setTaskFormState(newValue);
    return newValue;
  };

  return { taskFormState, setTaskFormState, handleTaskFormState };
};

export const useAlertState = (initialValue: boolean = false) => {
  const [alertState, setAlertState] = useState(initialValue);

  const handleAlertState = () => {
    const newValue = !alertState;
    setAlertState(newValue);
    return newValue;
  };

  return { alertState, setAlertState, handleAlertState };
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

export const useFilterModalState = (initialValue: boolean = false) => {
  const [filterModalState, setFilterModalState] = useState(initialValue);
  const [modalAnchor, setModalAnchor] = useState<null | HTMLElement>(null);

  const handleFilterModalState = () => {
    const newValue = !filterModalState;
    setFilterModalState(newValue);
    return newValue;
  };

  const handleModalAnchor = (event: React.MouseEvent<HTMLButtonElement>) => {
    setModalAnchor(event.currentTarget);
  };

  const handleModalAnchorClose = () => {
    setModalAnchor(null);
  };

  return {
    filterModalState,
    setFilterModalState,
    handleFilterModalState,
    modalAnchor,
    setModalAnchor,
    handleModalAnchor,
    handleModalAnchorClose,
  };
};

export const useFilterValue = (initialValue: string) => {
  const [filterValue, setFilterValue] = useState<string | unknown>(
    initialValue
  );

  const handleFilterValue = (
    event: React.MouseEvent<HTMLElement>,
    newValue: string
  ) => {
    setFilterValue(newValue);
    return newValue;
  };

  return { filterValue, setFilterValue, handleFilterValue };
};

export const useAnchor = () => {
  const [anchor, setAnchor] = useState<null | HTMLElement>(null);

  const openModal = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchor(event.currentTarget);
  };

  const closeModal = () => {
    setAnchor(null);
  };
  return { anchor, openModal, closeModal };
};
