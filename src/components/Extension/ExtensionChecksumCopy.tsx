import { clipboardCopy } from "@/utils/utils";
import { useState } from "react";
import { MdCheck } from "react-icons/md";

export default function ExtensionChecksumCopy({
    checksum,
}: {
    checksum: string;
}) {
    const [copied, setCopied] = useState(false);

    return (
        <a
            href="#"
            className="font-medium text-blue-600 dark:text-blue-500 hover:underline flex items-center gap-1 cursor-pointer"
            onClick={() => {
                clipboardCopy(checksum);
                setCopied(true);
                setTimeout(() => setCopied(false), 3000);
            }}
        >
            Copy{" "}
            {copied ? (
                <MdCheck
                    className="text-green-500 dark:text-green-400"
                    size="1.2em"
                />
            ) : null}
        </a>
    );
}
