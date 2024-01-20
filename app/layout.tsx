import "./globals.css";
import "./theme-config.css";
import "@radix-ui/themes/styles.css"; // import whole radix ui
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Container, Theme } from "@radix-ui/themes"; // import theme from radix ui
import NavBar from "./NavBar";
import AuthProvider from "./auth/AuthProvider";
import QueryClientProvider from "./QueryClientProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.variable}>
        <QueryClientProvider>
          <AuthProvider>
            <Theme>
              <NavBar />
              <main className="p-5 text-lg">
                <Container>{children}</Container>
              </main>
            </Theme>
          </AuthProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
