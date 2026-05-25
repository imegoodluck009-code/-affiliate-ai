import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Affiliate AI",
  description: "AI-powered affiliate marketing platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body style={{ margin: 0, background: "#0a192f", color: "#ffffff" }}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
