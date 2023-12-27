import NavigationBar from "./components/NavigationBar";
import HomeHeader from "./components/HomeHeader";
import TaskListCard from "./components/TaskListCard";
import AddTaskButton from "./components/AddTaskButton";

export default function Home() {
  return (
    <main>
      <NavigationBar />
      <HomeHeader />
      <TaskListCard />
      <AddTaskButton />
    </main>
  );
}
