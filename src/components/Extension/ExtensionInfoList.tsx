import { APIExtension } from "@/types/APIExtension";
import { numberFormatter } from "@/utils/formatters";
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
            <ul className="text-[#555] dark:text-[#999]">
                <li className="mt-2 flex items-center gap-[0.4em]">
                    <MdAccountCircle className="inline" />
                    <ExtensionAuthor author={extension.author} />
                    {extension.author?.isVerified && (
                        <MdCheckCircle className="inline" />
                    )}
                </li>

                <li>
                    <MdSchedule className="inline" />
                    &nbsp;Updated&nbsp;
                    <span className="text-black dark:text-white">
                        {formatDistanceToNowStrict(extension.lastUpdated, {
                            addSuffix: true,
                        })}
                    </span>
                </li>

                <li>
                    <MdDownload className="inline" />
                    &nbsp;
                    <span className="text-black dark:text-white">
                        {numberFormatter.format(extension.downloads)}
                    </span>
                    &nbsp;download
                    {extension.downloads === 1 ? "" : "s"}
                </li>

                <li>
                    <MdInfo className="inline" />
                    &nbsp;
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
                        <MdLink className="inline" />
                        &nbsp;
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
