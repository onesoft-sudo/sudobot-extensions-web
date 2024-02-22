import ExtensionPageState from "@/atoms/ExtensionPageAtom";
import useLocalStorage from "@/hooks/useLocalStorage";
import { CircularProgress, TextField } from "@mui/material";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { v4 as uuid } from "uuid";
import ThinButton from "../Button/ThinButton";
import { Divider } from "../Layout/Divider";

type Props = {
    onClose: () => void;
};

export default function InstallAddForm({ onClose }: Props) {
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [state, setState] = useRecoilState(ExtensionPageState);
    const [get, set] = useLocalStorage("global_state");

    // FIXME
    const fetchInfo = async (url: string) => {
        return {
            version: "8.6.1",
        };
    };

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);
        const url = formData.get("url") as string;

        if (!url) {
            setError("URL is required!");
            return;
        }

        try {
            const { pathname } = new URL(url);

            if (pathname !== "/") {
                setError("URL must not contain a pathname or request URI!");
                return;
            }
        } catch (e) {
            setError("Invalid URL!");
            return;
        }

        if (state.instances.some((i) => i.url.startsWith(url))) {
            setError("Instance already exists with this URL!");
            return;
        }

        setLoading(true);
        setError(null);

        fetchInfo(url)
            .then((info) => {
                setLoading(false);

                setState((s) => {
                    const newState = {
                        ...s,
                        instances: [
                            ...s.instances,
                            {
                                id: uuid(),
                                url,
                                version: info.version,
                            },
                        ],
                    };

                    set(
                        JSON.stringify({
                            instances: newState.instances,
                        })
                    );

                    return newState;
                });

                onClose();
            })
            .catch((e) => {
                setLoading(false);
                setError("Failed to fetch instance information!");
            });
    };

    return (
        <div>
            <div className="flex items-center gap-2">
                <p className="text-[#555] dark:text-[#999] text-sm w-[calc(0.875rem*18)]">
                    Add New Instance
                </p>
                <Divider />
            </div>

            <form action="#" onSubmit={onSubmit}>
                <TextField
                    label="Instance URL"
                    variant="outlined"
                    name="url"
                    className="w-full"
                    placeholder="https://www.sudobot.org"
                />
                <p className="text-xs text-red-500 dark:text-red-400 mt-2">
                    {error}
                </p>

                <div className="flex justify-end gap-2 items-center mt-3">
                    <ThinButton type="submit" disabled={loading}>
                        <span className="flex items-center gap-2">
                            {loading && (
                                <CircularProgress size="1rem" color="inherit" />
                            )}
                            {loading ? "Adding" : "Add"}
                        </span>
                    </ThinButton>

                    <ThinButton
                        type="button"
                        className={
                            "bg-white dark:bg-[#333] text-[#555] dark:text-[#eee] !outline-none hover:bg-[#eee] dark:hover:bg-[#444] hover:text-[#333] dark:hover:text-[#ddd] dark:focus:text-[#eee]"
                        }
                        onClick={onClose}
                    >
                        Cancel
                    </ThinButton>
                </div>
            </form>
        </div>
    );
}
