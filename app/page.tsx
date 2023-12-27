"use client";

import NavigationBar from "./components/NavigationBar";
import HomeHeader from "./components/HomeHeader";
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
