import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Image from "next/image";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Planning poker with AI",
  description: "by Anna Sobieraj-Kmiecik",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="container flex flex-col min-h-screen justify-between min-w-full">
          <header className="header_footer_component flex justify-center items-center p-2">
            <Image src="/logo.svg" alt="App logo" width={40} height={40} />
            <h3 className="text-white text-2xl font-bold">AgileVote</h3>
          </header>
          <main>{children}</main>
          <footer className="header_footer_component p-2">
            <Image
              src="\github.svg"
              height={30}
              width={30}
              alt="Github logo"
            ></Image>
          </footer>
        </div>
      </body>
    </html>
  );
}
