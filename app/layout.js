import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata = {
  title: "EcoMart — Sustainable Shopping",
  description:
    "Shop eco-friendly, sustainable products delivered to your door. Fast shipping, secure checkout.",
  keywords: "eco-friendly, sustainable, green products, online shopping",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased bg-gray-50`} style={{ backgroundColor: "#f9fafb" }}>{children}</body>
    </html>
  );
}
