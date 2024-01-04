import { useState } from "react";

export const useListForm = (initialState: boolean = false) => {
  const [listFormState, setListFormState] = useState<boolean>(initialState);

  const showListForm = () => setListFormState(true);
  const hideListForm = () => setListFormState(false);

  return { listFormState, showListForm, hideListForm };
};

export const useCustomSchedule = () => {
  const [checkedIntervalItems, setCheckedIntervalItems] = useState<string[]>(
    []
  );
  const [checkedDaysItems, setCheckedDaysItems] = useState<string[]>([]);

  const handleCheckedIntervals = (items: string[]) => {
    setCheckedIntervalItems(items);
  };

  const handleCheckedDays = (items: string[]) => {
    setCheckedDaysItems(items);
  };

  return {
    checkedIntervalItems,
    checkedDaysItems,
    handleCheckedIntervals,
    handleCheckedDays,
  };
};

export const usePriority = (initialState: boolean = false) => {
  const [priorityValue, setPriorityValue] = useState<boolean>(initialState);

  const togglePriority = () => setPriorityValue(!priorityValue);

  return { priorityValue, togglePriority };
};
