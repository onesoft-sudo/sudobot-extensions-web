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
            <div>
                <LinearProgress />
            </div>
        )
    );
}
