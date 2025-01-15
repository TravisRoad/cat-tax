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
      <body className={clsx("antialiased", "md:max-w-3xl mx-auto")}>
        {children}
        <footer className="flex flex-col"></footer>
      </body>
    </html>
  );
}
