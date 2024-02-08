"use client";

import useIsDesktop from "@/hooks/useIsDesktop";
import { HiOutlineCube } from "react-icons/hi2";
import ImageWithSkeleton from "../Image/ImageWithSkeleton";

const ExtensionIcon = ({ icon }: { icon: string | undefined | null }) => {
    const isDesktop = useIsDesktop();

    return (
        <ImageWithSkeleton
            icon={HiOutlineCube}
            component="img"
            src={icon ?? ""}
            skeleton={!icon}
            alt="Extension icon"
            className="rounded-lg"
            height={isDesktop ? 200 : 80}
            width={isDesktop ? 200 : 80}
        />
    );
};

export default ExtensionIcon;
