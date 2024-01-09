import HomeHeader from "./components/Header/HomeHeader";
import NavigationBar from "./components/NavigationBar";
import TaskListCard from "./components/TaskListCard";

export default function Home() {
  return (
    <main>
      <NavigationBar />
      <HomeHeader />
      <TaskListCard />
    </main>
  );
}
