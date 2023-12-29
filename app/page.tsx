import NavigationBar from "./components/NavigationBar";
import HomeHeader from "./components/HomeHeader";
import TaskListCard from "./components/TaskListCard";
import AddTaskMiniButton from "./components/AddTaskMiniButton";
import PopupForm from "./components/PopupForm";

export default function Home() {
  return (
    <main>
      <NavigationBar />
      <HomeHeader />
      <TaskListCard />
      <AddTaskMiniButton />
      <PopupForm />
    </main>
  );
}
