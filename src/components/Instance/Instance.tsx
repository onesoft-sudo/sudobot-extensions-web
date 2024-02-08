import { LocalStorageSystemInstance } from "@/types/SystemInstance";
import { Checkbox } from "@mui/material";
import semver from "semver";

type Props = {
    instance: LocalStorageSystemInstance;
};

function getVersion(url: string) {
    return url === "https://www.sudobot.org" ? "8.6.1" : "1.0.0";
}

export default function Instance({ instance }: Props) {
    const version =
        "version" in instance && typeof instance.version === "string"
            ? instance.version
            : getVersion(instance.url);
    const compatible = semver.gt(version, "8.0.0");

    return (
        <div
            key={instance.id}
            className="flex items-center justify-between p-3 rounded-lg bg-[#f5f5f5] dark:bg-[rgba(255,255,255,0.04)] my-2"
        >
            <div>
                <h1 className="text-lg font-semibold text-[#333] dark:text-[#ddd]">
                    {instance.url}
                </h1>
                <p className="text-sm text-[#555] dark:text-[#999]">
                    {version} &bull;{" "}
                    {compatible ? (
                        <span className="text-green-500 dark:text-green-400">
                            Compatible
                        </span>
                    ) : (
                        <span className="text-red-500 dark:text-red-400">
                            Incompatible
                        </span>
                    )}
                </p>
            </div>
            <Checkbox disabled={!compatible} />
        </div>
    );
}
