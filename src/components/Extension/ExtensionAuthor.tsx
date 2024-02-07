"use client";

import { APIExtension } from "@/types/APIExtension";
import { useRouter } from "next/navigation";
import { FC } from "react";

interface ExtensionAuthorProps {
    author: APIExtension["author"];
}

const ExtensionAuthor: FC<ExtensionAuthorProps> = ({ author }) => {
    const router = useRouter();

    return (
        <span
            className={`text-black dark:text-white ${
                author?.github ? "hover:underline" : ""
            }`}
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
