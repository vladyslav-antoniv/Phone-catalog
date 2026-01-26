import { NextIntlClientProvider } from "next-intl";
import { Header } from "@/widgets/Header";
import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "@/src/app/styles/globals.css";
import { Footer } from "@/widgets/Footer";
import { AuthListener, StoreProvider } from "@/src/app/providers/StoreProvider";
import { BreadCrumbs } from "@/widgets/BreadCrumbs";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nice Gadgets",
  description:
    "Your one-stop shop for the latest and greatest in tech gadgets.",
};

export default async function LocaleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className={inter.variable} suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NextIntlClientProvider>
          <StoreProvider>
            <AuthListener />
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <Header />
              <BreadCrumbs />
              <main className="">{children}</main>
              <Footer />
              <Toaster
                position="bottom-right"
                reverseOrder={false}
                toastOptions={{
                  duration: 3000,
                  style: {
                    background: "#333",
                    color: "#fff",
                  },
                }}
              />
            </ThemeProvider>
          </StoreProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
