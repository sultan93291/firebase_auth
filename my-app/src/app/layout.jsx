import { Inter } from "next/font/google";
import "./globals.css";
import { Layout } from "@/Store/Layout";


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "FbT",
  description: "Firebase Todo app",
};

export default function RootLayout({ children }) {
  return (
    <Layout>
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    </Layout>
  );
}
