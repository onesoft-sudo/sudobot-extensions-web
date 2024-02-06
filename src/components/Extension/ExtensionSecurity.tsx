import { APIExtension } from "@/types/APIExtension";
import { Tooltip } from "@mui/material";
import { FC } from "react";
import { HiShieldCheck, HiShieldExclamation } from "react-icons/hi2";
import { MdInfo } from "react-icons/md";

interface ExtensionSecurityProps {
    extension: APIExtension;
}

const styles = {
    safe: {
        main: "bg-green-50 dark:bg-[rgba(0,255,0,0.2)]",
        heading: "text-green-600 dark:text-green-400",
        description: "text-green-600 dark:text-green-400",
    },
    unknown: {
        main: "bg-yellow-50 dark:bg-[rgba(255,255,0,0.2)]",
        heading: "text-yellow-600 dark:text-yellow-400",
        description: "text-yellow-600 dark:text-yellow-400",
    },
    unsafe: {
        main: "bg-red-50 dark:bg-[rgba(255,0,0,0.2)]",
        heading: "text-red-600 dark:text-red-400",
        description: "text-red-600 dark:text-red-400",
    },
};

const icons = {
    safe: (
        <HiShieldCheck className="text-6xl text-green-600 dark:text-green-400" />
    ),
    unknown: (
        <HiShieldExclamation className="text-6xl text-yellow-600 dark:text-yellow-400" />
    ),
    unsafe: (
        <HiShieldExclamation className="text-6xl text-red-600 dark:text-red-400" />
    ),
};

const ExtensionSecurity: FC<ExtensionSecurityProps> = ({ extension }) => {
    return (
        <div
            className={`shadow dark:shadow-none rounded p-3 lg:p-5 grid grid-cols-[10fr_1fr] ${
                styles[extension.security].main
            }`}
        >
            <div>
                <h2
                    className={`text-lg md:text-xl lg:text-2xl mb-2 ${
                        styles[extension.security].heading
                    }`}
                >
                    Security
                </h2>
                <p className={styles[extension.security].description}>
                    {extension.security === "safe" && (
                        <>
                            This extension is secure, and is verified by The
                            SudoBot Developers.
                            {!extension.author?.isVerified && (
                                <Tooltip title="Although we've verified the extension itself, the author is not verified.">
                                    <MdInfo className="inline ml-2 -mt-1" />
                                </Tooltip>
                            )}
                        </>
                    )}
                    {extension.security === "unknown" && (
                        <>
                            This extension's security is unknown. Use at your
                            own risk.
                        </>
                    )}
                    {extension.security === "unsafe" && (
                        <>This extension is unsafe. Do not install it.</>
                    )}
                </p>
            </div>
            <div className="place-self-end">{icons[extension.security]}</div>
        </div>
    );
};

export default ExtensionSecurity;
