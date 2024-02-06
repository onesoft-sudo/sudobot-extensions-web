import { APIExtension } from "@/types/APIExtension";
import { Tooltip } from "@mui/material";
import Link from "next/link";
import { FC } from "react";
import { MdAccountCircle, MdCheckCircle, MdDownload } from "react-icons/md";
import ImageWithSkeleton from "../Image/ImageWithSkeleton";
import ExtensionAuthor from "./ExtensionAuthor";

interface ExtensionProps {
    extension: APIExtension;
}

const numberFormatter = new Intl.NumberFormat("en-US", {
    compactDisplay: "short",
    notation: "compact",
});

const Extension: FC<ExtensionProps> = ({ extension }) => {
    return (
        <Link
            href={`/extension/${encodeURIComponent(extension.id)}`}
            className="p-2 rounded bg-gray-50 dark:bg-[#191919] dark:shadow-[0_0_2px_1px_rgba(255,255,255,0.2)] hover:bg-gray-100 hover:dark:bg-[#222]"
        >
            <div className="flex items-center gap-3">
                <div>
                    {extension.icon ? (
                        <ImageWithSkeleton
                            component="img"
                            src={extension.icon}
                            alt={`Icon of ${extension.name} (${extension.id})`}
                            height={200}
                            width={200}
                            style={{ height: "4.5em", width: "4.5em" }}
                            className="rounded"
                        />
                    ) : (
                        <div className="h-[4.5em] w-[4.5em] bg-[#333] rounded"></div>
                    )}
                </div>
                <div>
                    <div className="text-xl lg:text-2xl">{extension.name}</div>
                    <div className="flex items-center gap-1 text-sm text-[#999]">
                        <Tooltip title="Author">
                            <MdAccountCircle />
                        </Tooltip>{" "}
                        <div>
                            by <ExtensionAuthor author={extension.author} />
                        </div>
                        {extension.author?.isVerified && (
                            <Tooltip
                                title={
                                    <span className="flex items-center gap-1">
                                        <MdCheckCircle className="text-green-500 scale-125" />
                                        This author is verified by The SudoBot
                                        Developers
                                    </span>
                                }
                            >
                                <MdCheckCircle />
                            </Tooltip>
                        )}
                    </div>
                    <div className="flex items-center gap-1 text-sm text-[#999]">
                        <Tooltip title="Downloads">
                            <MdDownload />
                        </Tooltip>{" "}
                        <div>
                            <span className="text-black dark:text-white">
                                {numberFormatter.format(extension.downloads)}
                            </span>{" "}
                            download
                            {extension.downloads === 1 ? "" : "s"}
                        </div>
                    </div>
                </div>
            </div>
            <div className="text-[#999] mt-2">
                {extension.description ?? (
                    <span className="italic">
                        No description is available for this extension
                    </span>
                )}
            </div>
        </Link>
    );
};

export default Extension;
