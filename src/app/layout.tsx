import type { Metadata } from "next";
import clsx from "clsx";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cat Tax Receipt Generator",
  description:
    "Paying your cat tax has never been more fun! Generate purr-fectly adorable cat tax receipts to share with the world. Simply upload your favorite feline photos, customize your receipt, and proudly display your contribution to the internet's cutest currency. Whether you're a cat lover or just here for the memes, this is the purr-fect place to celebrate the joy of cat tax!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          async
          src="https://umami.lxythan2lxy.cn/script.js"
          data-website-id="3eb5c5e9-a4ab-49f5-aa9e-7d47a4a55446"
        ></script>
      </head>
      <body className={clsx("antialiased", "md:max-w-3xl mx-auto")}>
        <div className="min-h-[95vh]">{children}</div>
        <footer className="flex flex-col items-center justify-center py-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt="GitHub Repo stars"
            src="https://img.shields.io/github/stars/TravisRoad/cat-tax"
            className="w-20"
          />
        </footer>
      </body>
    </html>
  );
}
