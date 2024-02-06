import { APIExtension } from "@/types/APIExtension";
import { numberFormatter } from "@/utils/formatters";
import { Tooltip } from "@mui/material";
import { formatDistanceToNowStrict } from "date-fns";
import Link from "next/link";
import { FC } from "react";
import {
    MdAccountCircle,
    MdCheckCircle,
    MdDownload,
    MdInfo,
    MdLink,
    MdSchedule,
} from "react-icons/md";
import ExtensionAuthor from "./ExtensionAuthor";

interface ExtensionInfoListProps {
    extension: APIExtension;
    className?: string;
}

const ExtensionInfoList: FC<ExtensionInfoListProps> = ({
    extension,
    className,
}) => {
    return (
        <div className={className}>
            <ul className="list-none text-[#555] dark:text-[#999]">
                <li className="mt-2 flex items-center gap-[0.4em]">
                    <Tooltip title="Author">
                        <MdAccountCircle className="inline" />
                    </Tooltip>{" "}
                    <ExtensionAuthor author={extension.author} />
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
                            <MdCheckCircle className="inline" />
                        </Tooltip>
                    )}
                </li>

                <li>
                    <Tooltip title="Last Updated">
                        <MdSchedule className="inline" />
                    </Tooltip>{" "}
                    Updated{" "}
                    <span className="text-black dark:text-white">
                        {formatDistanceToNowStrict(extension.lastUpdated, {
                            addSuffix: true,
                        })}
                    </span>
                </li>

                <li>
                    <Tooltip title="Downloads">
                        <MdDownload className="inline" />
                    </Tooltip>{" "}
                    <span className="text-black dark:text-white">
                        {numberFormatter.format(extension.downloads)}
                    </span>{" "}
                    download
                    {extension.downloads === 1 ? "" : "s"}
                </li>

                <li>
                    <Tooltip title="License">
                        <MdInfo className="inline" />
                    </Tooltip>{" "}
                    <Link
                        href={extension.licenseURL}
                        target="_blank"
                        rel="noreferrer"
                        className="hover:underline"
                    >
                        {extension.license}
                    </Link>
                </li>

                {extension.homepage && (
                    <li>
                        <Tooltip title="Homepage">
                            <MdLink className="inline" />
                        </Tooltip>{" "}
                        <Link
                            href={extension.homepage}
                            target="_blank"
                            rel="noreferrer"
                            className="hover:underline"
                        >
                            {extension.homepage}
                        </Link>
                    </li>
                )}
            </ul>
        </div>
    );
};

export default ExtensionInfoList;
