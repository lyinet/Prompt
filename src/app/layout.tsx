import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI 提示词管理平台",
  description: "收集、管理和分享 AI 提示词",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
