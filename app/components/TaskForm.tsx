import { Container } from "../lib/MUI-core-v4";
import AddTaskScheduleButtons from "./AddTaskScheduleButtons";
import TaskFormText from "./TaskFormText";
import TaskFormTextArea from "./TaskFormTextArea";

const TaskForm = () => {
  return (
    <Container maxWidth="md" className="p-4">
      <TaskFormText placeholder="Task Name" />
      <TaskFormTextArea placeholder="Task Description (Optional)" />
      <AddTaskScheduleButtons />
      <TaskFormText placeholder="#Tags (Optional)" />
    </Container>
  );
};

export default TaskForm;
