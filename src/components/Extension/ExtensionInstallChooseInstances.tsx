import { Box } from "@mui/material";
import { FC } from "react";
import Instances from "../Instance/Instances";

interface ExtensionInstallationChooseInstancesProps {}

const ExtensionInstallationChooseInstances: FC<
    ExtensionInstallationChooseInstancesProps
> = () => {
    return (
        <Box
            sx={{
                pt: 2,
            }}
        >
            <p className="text-sm md:text-base text-[#555] dark:text-[#999]">
                Choose the instances you want to install the extension on.
            </p>
            <br />

            <Instances />
        </Box>
    );
};

export default ExtensionInstallationChooseInstances;
