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
  onUpdateTaskData: (values: ITaskData[]) => void;
  onUpdateTaskListData: (values: ITaskListData[]) => void;
  onUpdateTimeIntervalData: (values: ITimeInterval[]) => void;
  onUpdateDayIntervalData: (values: IDayInterval[]) => void;
  onAlertOpen: () => void;
  open: boolean;
  onClose: () => void;
}

const TaskFormDialog = ({
  taskId,
  taskData,
  taskListData,
  open,
  onClose,
  onAlertOpen,
  timeIntervalData,
  dayIntervalData,
  onUpdateTaskListData,
  onUpdateTaskData,
  onUpdateTimeIntervalData,
  onUpdateDayIntervalData,
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
        onUpdateTaskList={onUpdateTaskListData}
        onUpdateTaskData={onUpdateTaskData}
        onTimeIntervalDataChange={onUpdateTimeIntervalData}
        onDayIntervalDataChange={onUpdateDayIntervalData}
      />
    </Dialog>
  );
};

export default TaskFormDialog;
