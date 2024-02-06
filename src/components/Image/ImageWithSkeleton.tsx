"use client";

import styles from "@/styles/ImageWithSkeleton.module.css";
import Image from "next/image";
import { ComponentProps, FC, useState } from "react";
import { MdQuestionMark } from "react-icons/md";

type ImageWithSkeletonProps = ComponentProps<typeof Image> & {
    component?: FC | "img";
    skeleton?: boolean;
};

const ImageWithSkeleton: FC<ImageWithSkeletonProps> = ({
    component = Image,
    skeleton = false,
    ...imageProps
}) => {
    const [status, setStatus] = useState<"loading" | "success" | "failure">(
        skeleton ? "failure" : "loading"
    );
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
            {status !== "failure" ? (
                <Component
                    onLoad={() => {
                        setStatus("success");
                    }}
                    onError={() => {
                        setStatus("failure");
                    }}
                    onAbort={() => {
                        setStatus("failure");
                    }}
                    {...finalImageProps}
                />
            ) : (
                <div
                    className={`absolute top-0 left-0 h-[100%] w-[100%] flex items-center justify-center bg-[#222]`}
                >
                    <MdQuestionMark className="text-4xl text-gray-500" />
                </div>
            )}
            {status === "loading" && (
                <div
                    className={`absolute top-0 left-0 h-[100%] w-[100%] ${styles.skeleton}`}
                ></div>
            )}
        </div>
    );
};

export default ImageWithSkeleton;
