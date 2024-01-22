import { ITaskList } from "@/app/data/taskListData";
import { Dialog } from "@/app/lib/MUI-core-v4";
import { ITaskForm } from "./form/ITaskForm";
import TaskForm from "./form/TaskForm";

interface Props {
  open: boolean;
  initForm: () => {
    initialValues: ITaskForm;
    taskListData: ITaskList[];
  };
  onFormSubmit: (values: ITaskForm) => void;
  onAlertOpen: () => void;
  onClose: () => void;
}

const TaskFormDialog = ({
  open,
  initForm,
  onFormSubmit,
  onAlertOpen,
  onClose,
}: Props) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg">
      <TaskForm
        initForm={initForm}
        onFormSubmit={onFormSubmit}
        onAlertOpen={onAlertOpen}
        onClose={onClose}
      />
    </Dialog>
  );
};

export default TaskFormDialog;
