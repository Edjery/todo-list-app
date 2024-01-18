import { IDayInterval } from "@/app/data/dayInterval-data";
import { ITaskData } from "@/app/data/task-data";
import { ITaskListData } from "@/app/data/taskList-data";
import { ITimeInterval } from "@/app/data/timeInterval-data";
import { Dialog } from "@/app/lib/MUI-core-v4";
import { Dispatch, SetStateAction } from "react";
import TaskForm from "./form/TaskForm";

interface Props {
  taskListData: ITaskListData[];
  setTaskListData: Dispatch<SetStateAction<ITaskListData[]>>;
  taskData: ITaskData[];
  setTaskData: Dispatch<SetStateAction<ITaskData[]>>;
  timeIntervalData: ITimeInterval[];
  setTimeIntervalData: Dispatch<SetStateAction<ITimeInterval[]>>;
  dayIntervalData: IDayInterval[];
  setDayIntervalData: Dispatch<SetStateAction<IDayInterval[]>>;
  open: boolean;
  onClose: () => void;
  onAlertOpen: () => void;
  taskId?: string | undefined;
}

const TaskFormDialog = ({
  taskListData,
  setTaskListData,
  taskData,
  setTaskData,
  timeIntervalData,
  setTimeIntervalData,
  dayIntervalData,
  setDayIntervalData,
  open,
  onClose,
  onAlertOpen,
  taskId,
}: Props) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg">
      <TaskForm
        taskListData={taskListData}
        taskData={taskData}
        onAlertOpen={onAlertOpen}
        onClose={onClose}
        taskId={taskId}
        setTaskListData={setTaskListData}
        setTaskData={setTaskData}
        timeIntervalData={timeIntervalData}
        setTimeIntervalData={setTimeIntervalData}
        dayIntervalData={dayIntervalData}
        setDayIntervalData={setDayIntervalData}
      />
    </Dialog>
  );
};

export default TaskFormDialog;
