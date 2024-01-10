import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import NavigationBar from "./components/NavigationBar";
import "./globals.css";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Todolistahan",
  description: "Todo List By Edjery Gumbao",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <NavigationBar />
        {children}
      </body>
    </html>
  );
}
