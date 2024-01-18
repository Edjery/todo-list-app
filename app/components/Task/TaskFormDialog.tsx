import { IDayInterval } from "@/app/data/dayInterval-data";
import { ITaskData } from "@/app/data/task-data";
import { ITaskListData } from "@/app/data/taskList-data";
import { ITimeInterval } from "@/app/data/timeInterval-data";
import { Dialog } from "@/app/lib/MUI-core-v4";
import TaskForm from "./form/TaskForm";

interface Props {
  taskListData: ITaskListData[];
  taskData: ITaskData[];
  timeIntervalData: ITimeInterval[];
  dayIntervalData: IDayInterval[];
  onTaskDataChange: (values: ITaskData[]) => void;
  onTaskListDataChange: (values: ITaskListData[]) => void;
  onTimeIntervalDataChange: (values: ITimeInterval[]) => void;
  onDayIntervalDataChange: (values: IDayInterval[]) => void;
  open: boolean;
  onClose: () => void;
  onAlertOpen: () => void;
  taskId?: string | undefined;
}

const TaskFormDialog = ({
  taskListData,
  onTaskListDataChange,
  taskData,
  onTaskDataChange,
  timeIntervalData,
  onTimeIntervalDataChange,
  dayIntervalData,
  onDayIntervalDataChange,
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
        onTaskListDataChange={onTaskListDataChange}
        onTaskDataChange={onTaskDataChange}
        timeIntervalData={timeIntervalData}
        onTimeIntervalDataChange={onTimeIntervalDataChange}
        dayIntervalData={dayIntervalData}
        onDayIntervalDataChange={onDayIntervalDataChange}
      />
    </Dialog>
  );
};

export default TaskFormDialog;
