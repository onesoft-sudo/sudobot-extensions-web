"use client";

import Button from "@/components/Button/Button";
import { APIExtension } from "@/types/APIExtension";
import { MdDownload } from "react-icons/md";
import DeployedCodeUpdate from "../Icons/DeployedCodeUpdate";

export default function ExtensionControls({
    extension,
}: {
    extension: APIExtension;
}) {
    return (
        <div className="block w-[100%] md:w-auto md:flex md:justify-end md:items-start md:gap-2">
            {extension.security === "unsafe" ? (
                <div className="flex text-center px-2 py-2 items-center gap-2 cursor-not-allowed text-[#555] dark:text-[#999]">
                    <MdDownload className="inline" />
                    Install
                </div>
            ) : (
                <>
                    <Button className="flex items-center gap-1 pr-5">
                        <MdDownload className="inline" />
                        Download
                    </Button>
                    <div className="md:hidden pt-2"></div>
                    <Button className="flex items-center gap-1 pr-5">
                        <DeployedCodeUpdate />
                        Install
                    </Button>
                </>
            )}
        </div>
    );
}
