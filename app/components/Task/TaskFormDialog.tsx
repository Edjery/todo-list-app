import { Dialog } from "@/app/lib/MUI-core-v4";
import TaskForm from "./form/TaskForm";
import ITask from "./ITask";

interface Props {
  formOpen: boolean;
  onFormClose: () => void;
  onAlertOpen: () => void;
  task?: ITask | undefined;
}

const TaskFormDialog = ({
  formOpen,
  onFormClose,
  onAlertOpen,
  task,
}: Props) => {
  return (
    <Dialog open={formOpen} onClose={onFormClose} maxWidth="lg">
      <TaskForm onAlertOpen={onAlertOpen} onClose={onFormClose} task={task} />
    </Dialog>
  );
};

export default TaskFormDialog;
