// "use client";
import "./globals.css";
import CalendarHeader from "./diary/CalendarHeader";

export const metadata = {
  title: "WEB Tutorial",
  description: "Generated by LDB",
};

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <div className="vertical-align">
          <CalendarHeader />
          {children}
        </div>
      </body>
    </html>
  );
}
