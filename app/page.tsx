import { CssBaseline } from "./lib/MUI-v4";
import NavigationBar from "./components/NavigationBar";

export default function Home() {
  return (
    <main>
      <CssBaseline />
      <NavigationBar />
      <div>Hello World</div>
    </main>
  );
}
