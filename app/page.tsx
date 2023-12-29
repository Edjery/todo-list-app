import AddTaskMiniButton from "./components/AddTaskMiniButton";
import HomeHeader from "./components/HomeHeader";
import NavigationBar from "./components/NavigationBar";
import TaskListCard from "./components/TaskListCard";

export default function Home() {
  return (
    <main>
      <NavigationBar />
      <HomeHeader />
      <TaskListCard />
      <AddTaskMiniButton />
    </main>
  );
}
