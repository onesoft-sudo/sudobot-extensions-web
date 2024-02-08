"use client";

import ExtensionPageState from "@/atoms/ExtensionPageAtom";
import { APIExtension } from "@/types/APIExtension";
import { Button } from "@mui/material";
import { MdDownload } from "react-icons/md";
import { useSetRecoilState } from "recoil";
import DeployedCodeUpdate from "../Icons/DeployedCodeUpdate";

export default function ExtensionControls({
    extension,
}: {
    extension: APIExtension;
}) {
    const setState = useSetRecoilState(ExtensionPageState);

    return (
        <div className="block w-[100%] md:w-auto md:flex md:justify-end md:items-start md:gap-2">
            {extension.security === "unsafe" ? (
                <div className="flex text-center px-2 py-2 items-center gap-2 cursor-not-allowed text-[#555] dark:text-[#999]">
                    <MdDownload className="inline" />
                    Install
                </div>
            ) : (
                <>
                    <Button
                        sx={{ px: 3 }}
                        className="!text-black dark:!text-white font-semibold"
                        fullWidth
                        startIcon={<MdDownload />}
                        onClick={() =>
                            setState((state) => ({
                                ...state,
                                downloadModalOpen: true,
                            }))
                        }
                    >
                        Download
                    </Button>
                    <div className="md:hidden pt-2"></div>
                    <Button
                        sx={{ px: 1.5 }}
                        fullWidth
                        startIcon={<DeployedCodeUpdate />}
                    >
                        Install
                    </Button>
                </>
            )}
        </div>
    );
}
