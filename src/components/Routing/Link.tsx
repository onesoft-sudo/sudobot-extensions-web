"use client";

import { useRouterEvents } from "@/contexts/RouterContext";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { ComponentProps, FC, KeyboardEvent, MouseEvent } from "react";

type LinkProps = Omit<ComponentProps<typeof NextLink>, "as"> & {
    nextLink?: boolean;
    as?: keyof JSX.IntrinsicElements | FC;
};

export default function Link({
    nextLink = true,
    as = NextLink as unknown as keyof JSX.IntrinsicElements,
    onClick,
    onKeyUp,
    href,
    children,
    ...props
}: LinkProps) {
    const pathname = usePathname();
    const events = useRouterEvents();
    const Component = ((nextLink ? NextLink : as) ?? "a") as "a";
    const propsToPass = {
        ...props,
        href,
    } as ComponentProps<typeof NextLink>;

    if (nextLink) {
        propsToPass.as = as as unknown as keyof JSX.IntrinsicElements;
    }

    const stringHref = href.toString();

    const onNavigate = () => {
        const pos = stringHref.indexOf("?");

        if (
            !stringHref.startsWith("https://") &&
            !stringHref.startsWith("http://") &&
            pathname !==
                stringHref
                    .substring(0, pos === -1 ? undefined : pos)
                    .replace(/\/+/g, "/")
                    .replace(/\/$/g, "") &&
            !(pathname === "/" && stringHref === "/")
        ) {
            events?.emit("routeChangeStart");
        }
    };

    return (
        <Component
            href={href as string}
            {...props}
            onClick={(event) => {
                event.stopPropagation();
                onClick?.(event as MouseEvent<any, any>);
                onNavigate();
            }}
            onKeyUp={(event) => {
                onKeyUp?.(event as KeyboardEvent<any>);

                if (event.key === "Enter") {
                    onNavigate();
                }
            }}
        >
            {children}
        </Component>
    );
}
