import Navbar from "@/components/Navbar/Navbar";
import RouteChangeProgress from "@/components/Routing/RouteChangeProgress";
import "@/styles/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Providers from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "SudoBot Extensions",
    description:
        "Explore and install officially supported extensions for SudoBot",
    metadataBase: process.env.NEXT_PUBLIC_METADATA_BASEURL ? new URL(process.env.NEXT_PUBLIC_METADATA_BASEURL) : undefined,
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <Providers>
                    <RouteChangeProgress />
                    <Navbar />
                    {children}
                </Providers>
            </body>
        </html>
    );
}
