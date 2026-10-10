import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "أثر | عطور تُروى",
  description: "عطور عربية معاصرة من العود والعنبر والمسك، صُممت لتترك حضورًا لا يُنسى.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <meta name="theme-color" content="#0c0d0b" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Noto+Kufi+Arabic:wght@300;400;500;600&family=Reem+Kufi:wght@400;500;600&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}
