"use client";

import { APIExtension } from "@/types/APIExtension";
import { useRouter } from "next/navigation";
import { FC } from "react";

interface ExtensionAuthorProps {
    author: APIExtension["author"];
    className?: string;
}

const ExtensionAuthor: FC<ExtensionAuthorProps> = ({ author, className }) => {
    const router = useRouter();

    return (
        <span
            className={`text-black dark:text-white ${
                author?.github ? "hover:underline cursor-pointer" : ""
            } ${className}`}
            onClick={
                author?.github
                    ? () => router.replace(author?.github!)
                    : undefined
            }
        >
            {author?.name ?? "Unknown"}
        </span>
    );
};

export default ExtensionAuthor;
