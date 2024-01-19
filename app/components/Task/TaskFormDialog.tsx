import { IDayInterval } from "@/app/data/dayIntervalData";
import { ITaskData } from "@/app/data/taskData";
import { ITaskListData } from "@/app/data/taskListData";
import { ITimeInterval } from "@/app/data/timeIntervalData";
import { Dialog } from "@/app/lib/MUI-core-v4";
import TaskForm from "./form/TaskForm";

interface Props {
  taskListData: ITaskListData[];
  taskData: ITaskData[];
  timeIntervalData: ITimeInterval[];
  dayIntervalData: IDayInterval[];
  taskId?: string | undefined;
  onTaskDataUpdate: (values: ITaskData[]) => void;
  onTaskListDataUpdate: (values: ITaskListData[]) => void;
  onTimeIntervalDataUpdate: (values: ITimeInterval[]) => void;
  onDayIntervalDataUpdate: (values: IDayInterval[]) => void;
  onAlertOpen: () => void;
  open: boolean;
  onClose: () => void;
}

const TaskFormDialog = ({
  taskId,
  taskData,
  open,
  onClose,
  onAlertOpen,
  taskListData,
  timeIntervalData,
  dayIntervalData,
  onTaskListDataUpdate,
  onTaskDataUpdate,
  onTimeIntervalDataUpdate,
  onDayIntervalDataUpdate,
}: Props) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg">
      <TaskForm
        taskId={taskId}
        taskData={taskData}
        onClose={onClose}
        onAlertOpen={onAlertOpen}
        taskListData={taskListData}
        timeIntervalData={timeIntervalData}
        dayIntervalData={dayIntervalData}
        onTaskListDataUpdate={onTaskListDataUpdate}
        onTaskDataUpdate={onTaskDataUpdate}
        onTimeIntervalDataUpdate={onTimeIntervalDataUpdate}
        onDayIntervalDataUpdate={onDayIntervalDataUpdate}
      />
    </Dialog>
  );
};

export default TaskFormDialog;
