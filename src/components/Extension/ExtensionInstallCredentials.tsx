import { Box, TextField } from "@mui/material";
import { FC } from "react";

interface ExtensionInstallCredentialsProps {}

const ExtensionInstallCredentials: FC<
    ExtensionInstallCredentialsProps
> = () => {
    return (
        <Box sx={{ pt: 2 }}>
            <p className="text-sm md:text-base text-[#555] dark:text-[#999]">
                Enter the credentials to authenticate and install the extension.
            </p>

            <div className="grid md:grid-cols-2 gap-4 mt-4">
                <TextField
                    type="text"
                    placeholder="Username"
                    className="input"
                />
                <TextField
                    type="password"
                    placeholder="Password"
                    className="input"
                />
            </div>
        </Box>
    );
};

export default ExtensionInstallCredentials;
