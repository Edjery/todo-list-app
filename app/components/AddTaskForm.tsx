import { Container } from "../lib/MUI-core-v4";
import AddTaskInputs from "./AddTaskInputs";
import AddTaskScheduleButtons from "./AddTaskScheduleButtons";
import GroupTaskCheckBox from "./GroupTaskCheckBox";

const AddTaskForm = () => {
  const intervals = ["Daily", "Monthly", "Weekly", "Monthly", "Yearly"];
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Sunday",
  ];

  return (
    <Container maxWidth="md" className="p-4">
      <AddTaskInputs placeholder="Task Name" />
      <AddTaskInputs placeholder="Task Description (Optional)" />

      <AddTaskScheduleButtons />

      <GroupTaskCheckBox list={intervals} />
      <GroupTaskCheckBox list={days} />

      <AddTaskInputs placeholder="#Tags (Optional)" />
    </Container>
  );
};

export default AddTaskForm;
