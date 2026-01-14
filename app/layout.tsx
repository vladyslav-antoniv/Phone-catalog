import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nice Gadgets",
  description:
    "Your one-stop shop for the latest and greatest in tech gadgets.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
