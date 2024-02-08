"use client";

import ExtensionPageState from "@/atoms/ExtensionPageAtom";
import { APIExtension } from "@/types/APIExtension";
import {
    Box,
    Button,
    Modal,
    Step,
    StepLabel,
    Stepper,
    Typography,
} from "@mui/material";
import { useState } from "react";
import { MdClose } from "react-icons/md";
import { useRecoilState } from "recoil";
import DeployedCodeUpdate from "../Icons/DeployedCodeUpdate";
import ExtensionInstallationChooseInstances from "./ExtensionInstallChooseInstances";
import ExtensionInstallCredentials from "./ExtensionInstallCredentials";

type Props = {
    extension: APIExtension;
};

const steps = ["Choose instances", "Install", "Finish"];
const components = [
    ExtensionInstallationChooseInstances,
    ExtensionInstallCredentials,
    () => <p>Finish</p>,
];

export default function ExtensionInstallModal({ extension }: Props) {
    const [state, setState] = useRecoilState(ExtensionPageState);
    const [activeStep, setActiveStep] = useState(0);
    const [skipped, setSkipped] = useState(new Set<number>());
    const onClose = () => {
        setState((state) => ({ ...state, installModalOpen: false }));
        setActiveStep(0);
        setSkipped(new Set<number>());
    };

    const StepComponent = components[activeStep];

    const isStepOptional = (step: number) => {
        return false;
    };

    const isStepSkipped = (step: number) => {
        return skipped.has(step);
    };

    const handleNext = () => {
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleSkip = () => {
        if (!isStepOptional(activeStep)) {
            throw new Error("You can't skip a step that isn't optional.");
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped((prevSkipped) => {
            const newSkipped = new Set(prevSkipped.values());
            newSkipped.add(activeStep);
            return newSkipped;
        });
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    return (
        <Modal
            open={state.installModalOpen}
            onClose={onClose}
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                "@media (max-width: 640px)": {
                    marginTop: "10%",
                },
            }}
        >
            <div className="bg-white shadow dark:shdaow-none dark:bg-[#222] w-[90%] md:w-[50%] h-[82%] md:h-[60%] rounded-lg relative">
                <div className="p-4 rounded-t-lg flex items-center justify-between">
                    <h1 className="text-xl md:text-2xl font-semibold text-[#333] dark:text-[#ddd]">
                        <DeployedCodeUpdate size="1.3" />
                        <span className="ml-3">Install {extension.name}</span>
                    </h1>
                    <Button onClick={onClose} sx={{ minWidth: 0, px: 1 }}>
                        <MdClose size="1.4em" />
                    </Button>
                </div>
                <hr className="border-t dark:border-[#444]" />
                <div className="p-4 h-[70%] overflow-y-scroll">
                    <Box sx={{ width: "100%" }}>
                        <Stepper activeStep={activeStep}>
                            {steps.map((label, index) => {
                                const stepProps: { completed?: boolean } = {};
                                const labelProps: {
                                    optional?: React.ReactNode;
                                } = {};

                                if (isStepOptional(index)) {
                                    labelProps.optional = (
                                        <Typography variant="caption">
                                            Optional
                                        </Typography>
                                    );
                                }

                                if (isStepSkipped(index)) {
                                    stepProps.completed = false;
                                }

                                return (
                                    <Step key={label} {...stepProps}>
                                        <StepLabel {...labelProps}>
                                            {label}
                                        </StepLabel>
                                    </Step>
                                );
                            })}
                        </Stepper>
                        {activeStep === steps.length ? (
                            <>
                                <Typography sx={{ mt: 2, mb: 1 }}>
                                    All steps completed - you&apos;re finished
                                </Typography>
                            </>
                        ) : (
                            <StepComponent />
                        )}
                    </Box>

                    <div className="rounded-b-lg flex justify-end gap-4 p-4 absolute bottom-0 left-0 w-[100%] z-[10000] bg-white dark:bg-[#222] [box-shadow:0_-1px_1px_0_rgba(0,0,0,0.1)] dark:[box-shadow:0_0_1px_0_rgba(255,255,255,0.4)]">
                        <Button
                            color="inherit"
                            disabled={activeStep === 0}
                            onClick={handleBack}
                            sx={{ mr: 1 }}
                        >
                            Back
                        </Button>
                        <Box sx={{ flex: "1 1 auto" }} />
                        {isStepOptional(activeStep) && (
                            <Button
                                color="inherit"
                                onClick={handleSkip}
                                sx={{ mr: 1 }}
                            >
                                Skip
                            </Button>
                        )}
                        <Button onClick={onClose}>Cancel</Button>{" "}
                        <Button onClick={handleNext} variant="outlined">
                            {activeStep === steps.length - 1
                                ? "Finish"
                                : "Next"}
                        </Button>
                    </div>
                </div>
            </div>
        </Modal>
    );
}
