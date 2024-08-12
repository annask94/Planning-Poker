import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Image from "next/image";
import "./globals.css";
import Link from "next/link";
import { Toaster, toast } from "sonner";

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
          <header className="header_footer_component ">
            <Link href="/" className="flex justify-center items-center p-2">
              <Image src="/logo.svg" alt="App logo" width={25} height={25} />
              <p className="text-white text-lg font-bold ml-1">AgileVote</p>
            </Link>
          </header>
          <Toaster richColors position="top-center" />
          <main>{children}</main>
          <footer className="header_footer_component p-2">
            <a
              href="https://github.com/annask94"
              className="flex justify-center items-center gap-4"
            >
              <Image
                src="\github.svg"
                height={25}
                width={25}
                alt="Github logo"
              ></Image>
              <p className="text-white text-sm">Anna Sobieraj-Kmiecik</p>
            </a>
          </footer>
        </div>
      </body>
    </html>
  );
}
