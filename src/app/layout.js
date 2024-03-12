// "use client";
import Link from "next/link";
import "./globals.css";
import Control from "./Control";
import CalendarHeader from "./diary/CalendarHeader";
import DiaryList from "./diary/page";

export const metadata = {
  title: "WEB Tutorial",
  description: "Generated by LDB",
};

export default function RootLayout({ children }) {

  //const resp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}topics`, { cache: 'no-store' });

  //const topics = await resp.json();



  return (
    <html>
      <body>
        {children}
      </body>
    </html>
  );
}
