import "./globals.css";
import "./theme-config.css";
import "@radix-ui/themes/styles.css"; // import whole radix ui
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Theme, ThemePanel } from "@radix-ui/themes"; // import theme from radix ui
import NavBar from "./NavBar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Issue tracker",
  description: "Track your issues with ease",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.variable}>
        <Theme>
          <Theme accentColor="iris">
            <NavBar />
            <main className="p-5">{children}</main>
          </Theme>
        </Theme>
      </body>
    </html>
  );
}
