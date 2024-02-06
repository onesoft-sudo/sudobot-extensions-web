"use client";

import { useRouterEvents } from "@/contexts/RouterContext";
import { useRouter as useNextRouter } from "next/navigation";

export default function useRouter() {
    const events = useRouterEvents();
    const router = useNextRouter();

    return {
        prefetch: router.prefetch,
        back: router.back,
        push(href, options) {
            events?.emit("routeChangeStart");
            router.push(href, options);
        },
        forward: router.forward,
        refresh: router.refresh,
        replace: router.replace,
    } satisfies typeof router;
}
