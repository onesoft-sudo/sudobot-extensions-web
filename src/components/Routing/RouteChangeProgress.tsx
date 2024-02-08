"use client";

import { useRouteChanging, useRouterEvents } from "@/contexts/RouterContext";
import { LinearProgress } from "@mui/material";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function RouteChangeProgress() {
    const routeChanging = useRouteChanging();
    const events = useRouterEvents();
    const pathname = usePathname();

    useEffect(() => {
        if (routeChanging) {
            events?.emit("routeChangeComplete");
        }
    }, [pathname]);

    return (
        routeChanging && (
            <div className="z-[100000] fixed top-0 left-0 w-[100svw]">
                <LinearProgress />
            </div>
        )
    );
}
