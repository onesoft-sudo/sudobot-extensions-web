"use client";

import useIsDesktop from "@/hooks/useIsDesktop";
import ImageWithSkeleton from "../Image/ImageWithSkeleton";

const ExtensionIcon = ({ icon }: { icon: string | undefined | null }) => {
    const isDesktop = useIsDesktop();
    return (
        <ImageWithSkeleton
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
