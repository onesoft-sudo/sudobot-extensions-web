import ExtensionPageState from "@/atoms/ExtensionPageAtom";
import { Box } from "@mui/material";
import { FC, useState } from "react";
import { MdError } from "react-icons/md";
import { useRecoilValue } from "recoil";
import InstallAddForm from "../Instance/InstanceAddForm";
import Instances from "../Instance/Instances";
import { StepProps } from "./ExtensionInstallModal";

const ExtensionInstallationChooseInstances: FC<StepProps> = ({
    setNextValidator,
}) => {
    const state = useRecoilValue(ExtensionPageState);
    const [isValid, setIsValid] = useState(true);
    const [addingInstance, setAddingInstance] = useState(false);

    setNextValidator(() => {
        const valid = state.selectedInstanceIds.length > 0;

        if (valid !== isValid) {
            setIsValid(valid);
        }

        return valid;
    });

    return (
        <Box
            sx={{
                pt: 2,
            }}
        >
            <div className="md:flex justify-between items-center">
                <p className="text-sm md:text-base text-[#555] dark:text-[#999]">
                    Choose the instances you want to install the extension on.
                    You can{" "}
                    <a
                        href="#"
                        className="text-blue-500 hover:underline hover:text-blue-600"
                        onClick={() => setAddingInstance(true)}
                    >
                        add more instances
                    </a>{" "}
                    if you want.
                </p>
            </div>
            <br />

            {!isValid && (
                <p className="text-xs text-red-500 dark:text-red-400 flex items-center gap-1">
                    <MdError />
                    {state.instances.length === 0
                        ? "You must add at least one instance."
                        : "You must select at least one instance."}
                </p>
            )}

            <Instances />

            {addingInstance && (
                <InstallAddForm onClose={() => setAddingInstance(false)} />
            )}

            <div className="pb-7"></div>
        </Box>
    );
};

export default ExtensionInstallationChooseInstances;
