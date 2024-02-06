"use client";

import { APIExtension } from "@/types/APIExtension";
import { FC } from "react";

interface ExtensionAuthorProps {
    author: APIExtension["author"];
}

const ExtensionAuthor: FC<ExtensionAuthorProps> = ({ author }) => {
    return (
        <span
            className={`text-black dark:text-white ${
                author?.github ? "hover:underline" : ""
            }`}
            onClick={
                author?.github
                    ? () => window.location.replace(author?.github!)
                    : undefined
            }
        >
            {author?.name ?? "Unknown"}
        </span>
    );
};

export default ExtensionAuthor;
