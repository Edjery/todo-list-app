import { Dialog } from "@/app/lib/MUI-core-v4";
import ITaskIndex from "./ITaskIndex";
import TaskForm from "./form/TaskForm";

interface Props {
  open: boolean;
  onClose: () => void;
  onAlertOpen: () => void;
  task?: ITaskIndex | undefined;
}

const TaskFormDialog = ({ open, onClose, onAlertOpen, task }: Props) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg">
      <TaskForm onAlertOpen={onAlertOpen} onClose={onClose} task={task} />
    </Dialog>
  );
};

export default TaskFormDialog;
