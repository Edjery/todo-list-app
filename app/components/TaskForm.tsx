import { Container } from "../lib/MUI-core-v4";
import AddTaskScheduleButtons from "./AddTaskScheduleButtons";
import TaskFormText from "./TaskFormText";
import TaskFormTextArea from "./TaskFormTextArea";

interface Props {
  schedValue: string;
  handleSchedValue: (
    event: React.MouseEvent<HTMLElement>,
    newValue: string | null
  ) => void;
}

const TaskForm = ({ schedValue, handleSchedValue }: Props) => {
  return (
    <Container maxWidth="md" className="p-4">
      <TaskFormText placeholder="Task Name" />
      <TaskFormTextArea placeholder="Task Description (Optional)" />
      <AddTaskScheduleButtons
        schedValue={schedValue}
        handleSchedValue={handleSchedValue}
      />
      <TaskFormText placeholder="#Tags (Optional)" />
    </Container>
  );
};

export default TaskForm;
