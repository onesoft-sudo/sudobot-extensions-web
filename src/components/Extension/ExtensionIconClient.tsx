"use client";

import { APIExtension, PartialAPIExtension } from "@/types/APIExtension";
import { FC } from "react";
import { HiOutlineCube } from "react-icons/hi2";
import ImageWithSkeleton from "../Image/ImageWithSkeleton";

interface ExtensionIconClientProps {
    extension: PartialAPIExtension;
}

const ExtensionIconClient: FC<ExtensionIconClientProps> = ({ extension }) => {
    return (
        <ImageWithSkeleton
            component="img"
            icon={HiOutlineCube}
            src={extension.icon ?? ""}
            skeleton={!extension.icon}
            alt={`Icon of ${extension.name} (${extension.id})`}
            height={200}
            width={200}
            style={{ height: "4.5em", width: "4.5em" }}
            className="rounded"
        />
    );
};

export default ExtensionIconClient;
