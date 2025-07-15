import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SASWA - Southern Africa Sex Workers Alliance",
  description: "Empowering sex workers across Southern Africa.",
};

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={montserrat.className}>
      <Header />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </div>
  );
}
