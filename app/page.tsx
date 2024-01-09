import NavigationBar from "./components/NavigationBar";
import TaskFormWrapper from "./components/Task/TaskFormWrapper";
import TaskList from "./components/TaskList";

export default function Home() {
  return (
    <main>
      <NavigationBar />
      <TaskFormWrapper />
      <TaskList />
    </main>
  );
}
