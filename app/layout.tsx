import "./globals.css";
import { Inter } from "next/font/google";
import Providers from "@/components/Providers";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Head from "next/head";
import { ThemeProvider as NextThemesProvider } from "next-themes";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Nicholas Fasching",
  description: "The homepage of Nicholas Fasching's website.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <body className={inter.className}>
        <Providers>{children}</Providers>
        <SpeedInsights />
        <script
          async={true}
          defer={true}
          src="https://lytics.njf.dev/script.js"
          data-website-id="79e723de-9025-4a69-b05c-2aea6bf0c69c"
        ></script>
      </body>
    </html>
  );
}
