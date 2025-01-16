import type { Metadata } from "next";
import clsx from "clsx";
import "./globals.css";
import Script from "next/script";

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
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <script
          async
          src="https://umami.lxythan2lxy.cn/script.js"
          data-website-id="3eb5c5e9-a4ab-49f5-aa9e-7d47a4a55446"
        ></script>
        <Script id="clarity-script" strategy="afterInteractive">
          {`(function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "puh05hpeg3");`}
        </Script>
      </head>
      <body className={clsx("antialiased", "md:max-w-3xl mx-auto")}>
        <div className="min-h-[95vh]">{children}</div>
        <footer className="flex flex-col items-center justify-center py-4">
          <a href="https://github.com/TravisRoad/cat-tax" target="_blank">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt="GitHub Repo stars"
              src="https://img.shields.io/github/stars/TravisRoad/cat-tax"
              className="w-20"
            />
          </a>
        </footer>
      </body>
    </html>
  );
}
