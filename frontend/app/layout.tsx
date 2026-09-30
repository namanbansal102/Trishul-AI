import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "@/components/session-context"
import { WagmiProviderWrapper } from "@/components/WagmiProviderWrapper"


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
export const metadata: Metadata = {
  title: "Trishul AI",
  description: "Your intelligent Web3 assistant.",
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
}
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <WagmiProviderWrapper>
          <SessionProvider>{children}</SessionProvider>
        </WagmiProviderWrapper>
      </body>
    </html>
  );
}
