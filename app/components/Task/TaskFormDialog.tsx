import { Dialog } from "@/app/lib/MUI-core-v4";
import TaskForm from "./form/TaskForm";
import ITask from "./ITask";

interface Props {
  open: boolean;
  onClose: () => void;
  onAlertOpen: () => void;
  task?: ITask | undefined;
}

const TaskFormDialog = ({ open, onClose, onAlertOpen, task }: Props) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg">
      <TaskForm onAlertOpen={onAlertOpen} onClose={onClose} task={task} />
    </Dialog>
  );
};

export default TaskFormDialog;
