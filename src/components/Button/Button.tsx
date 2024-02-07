"use client";

import { ComponentProps } from "react";

export default function Button({
    className,
    children,
    ...props
}: ComponentProps<"button">) {
    return (
        <button
            className={`bg-[rgba(0,0,0,0.07)] dark:bg-[rgba(255,255,255,0.17)] hover:bg-[#bbb] dark:hover:bg-[#222] focus:outline dark:focus:outline-[#999] focus:outline-2 cursor-pointer font-semibold py-2 px-4 rounded ${className}`}
            {...props}
        >
            {children}
        </button>
    );
}
