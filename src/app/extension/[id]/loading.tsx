"use client";

import { CircularProgress } from "@mui/material";

export default function Loading() {
    return (
        <div className="flex justify-center items-center min-h-[80svh] gap-5">
            <CircularProgress className="text-black dark:text-white" />{" "}
            <span className="text-xl md:text-2xl lg:text-3xl xl:text-4xl">
                Loading
            </span>
        </div>
    );
}
