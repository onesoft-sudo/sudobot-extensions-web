import { APIExtension } from "@/types/APIExtension";
import { numberFormatter } from "@/utils/formatters";
import { formatDistanceToNowStrict } from "date-fns";
import Link from "next/link";
import { FC } from "react";
import { BsShieldCheck } from "react-icons/bs";

interface ExtensionInfoListMobileProps {
    extension: APIExtension;
    className?: string;
}

async function getLicenseInformation(id: string) {
    const response = await fetch(
        `https://raw.githubusercontent.com/spdx/license-list-data/main/json/licenses.json`,
        {
            next: {
                revalidate: 180_000,
            },
        }
    );
    const { licenses } = await response.json();

    for (const license of licenses) {
        if (license.licenseId === id) {
            return license;
        }
    }

    return null;
}

const ExtensionInfoMobileList: FC<ExtensionInfoListMobileProps> = async ({
    extension,
    className,
}) => {
    const licenseInfo = await getLicenseInformation(extension.license);
    return (
        <div
            className={`w-[100%] place-items-center text-center my-5 grid grid-cols-[1fr_1px_1fr_1px_1fr] gap-3 ${className}`}
        >
            <div>
                <span className="text-2xl">
                    {numberFormatter.format(extension.downloads)}
                </span>
                <br />
                <span className="text-[#555] dark:text-[#999] text-sm">
                    Download{extension.downloads === 1 ? "" : "s"}
                </span>
            </div>
            <div className="h-[100%] w-[2px] bg-[#bbb] dark:bg-[#444] block"></div>
            {extension.security === "safe" ? (
                <div>
                    <span className="text-4xl flex items-center justify-center">
                        <BsShieldCheck className="inline" />
                    </span>
                    <span className="text-[#555] dark:text-[#999] text-sm pt-2 block">
                        Safe to use
                    </span>
                </div>
            ) : (
                <div>
                    <Link
                        href={licenseInfo.reference}
                        className="hover:underline"
                        target="_blank"
                        rel="noreferrer"
                    >
                        {licenseInfo.licenseId}
                    </Link>
                    <br />
                    <span className="text-[#555] dark:text-[#999] text-sm">
                        License
                    </span>
                </div>
            )}
            <div className="h-[100%] w-[2px] bg-[#bbb] dark:bg-[#444] block"></div>
            <div>
                <span className="text-xl">
                    {formatDistanceToNowStrict(new Date(extension.lastUpdated))}
                </span>
                <span className="text-[#555] dark:text-[#999] text-sm pt-2 block">
                    Since last update
                </span>
            </div>
        </div>
    );
};

export default ExtensionInfoMobileList;
