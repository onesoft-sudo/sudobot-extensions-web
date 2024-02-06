import Navbar from "@/components/Navbar/Navbar";
import RouteChangeProgress from "@/components/Routing/RouteChangeProgress";
import { RouterContextProvider } from "@/contexts/RouterContext";
import "@/styles/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "SudoBot Extensions",
    description:
        "Explore and install officially supported extensions for SudoBot",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <RouterContextProvider>
                    <RouteChangeProgress />
                    <Navbar />
                    {children}
                </RouterContextProvider>
            </body>
        </html>
    );
}
