import { CssBaseline } from "./lib/MUI-v4";
import NavigationBar from "./components/NavigationBar";
import HomeHeader from "./components/HomeHeader";

export default function Home() {
  return (
    <main>
      {/* <CssBaseline /> */}
      <NavigationBar />
      <HomeHeader />
    </main>
  );
}
