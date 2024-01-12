import { IDayInterval } from "@/app/data/dayInterval-data";
import { ITaskData } from "@/app/data/task-data";
import { ITaskListData } from "@/app/data/taskList-data";
import { ITimeInterval } from "@/app/data/timeInterval-data";
import { Dialog } from "@/app/lib/MUI-core-v4";
import { Dispatch, SetStateAction } from "react";
import TaskForm from "./form/TaskForm";

interface Props {
  task_list_data: ITaskListData[];
  set_task_list_data: Dispatch<SetStateAction<ITaskListData[]>>;
  task_data: ITaskData[];
  set_task_data: Dispatch<SetStateAction<ITaskData[]>>;
  timeInterval_data: ITimeInterval[];
  set_timeInterval_data: Dispatch<SetStateAction<ITimeInterval[]>>;
  dayInterval_data: IDayInterval[];
  set_dayInterval_data: Dispatch<SetStateAction<IDayInterval[]>>;
  open: boolean;
  onClose: () => void;
  onAlertOpen: () => void;
  taskId?: string | undefined;
}

const TaskFormDialog = ({
  task_list_data,
  set_task_list_data,
  task_data,
  set_task_data,
  timeInterval_data,
  set_timeInterval_data,
  dayInterval_data,
  set_dayInterval_data,
  open,
  onClose,
  onAlertOpen,
  taskId,
}: Props) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg">
      <TaskForm
        task_list_data={task_list_data}
        task_data={task_data}
        onAlertOpen={onAlertOpen}
        onClose={onClose}
        taskId={taskId}
        set_task_list_data={set_task_list_data}
        set_task_data={set_task_data}
        timeInterval_data={timeInterval_data}
        set_timeInterval_data={set_timeInterval_data}
        dayInterval_data={dayInterval_data}
        set_dayInterval_data={set_dayInterval_data}
      />
    </Dialog>
  );
};

export default TaskFormDialog;
