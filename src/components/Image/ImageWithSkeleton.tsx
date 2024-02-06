"use client";

import styles from "@/styles/ImageWithSkeleton.module.css";
import Image from "next/image";
import { ComponentProps, FC, useState } from "react";

type ImageWithSkeletonProps = ComponentProps<typeof Image> & {
    component?: FC | "img";
};

const ImageWithSkeleton: FC<ImageWithSkeletonProps> = ({
    component = Image,
    ...imageProps
}) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const { onLoad, ...finalImageProps } = imageProps;
    const Component = component as FC<any>;

    return (
        <div
            className="relative"
            style={{
                height: imageProps.style?.height ?? imageProps.height,
                width: imageProps.style?.width ?? imageProps.width,
            }}
        >
            <Component
                onLoad={() => {
                    setIsLoaded(true);
                }}
                {...finalImageProps}
            />
            {!isLoaded && (
                <div
                    className={`absolute top-0 left-0 h-[100%] w-[100%] ${styles.skeleton}`}
                ></div>
            )}
        </div>
    );
};

export default ImageWithSkeleton;
