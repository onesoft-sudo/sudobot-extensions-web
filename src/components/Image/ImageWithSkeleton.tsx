"use client";

import styles from "@/styles/ImageWithSkeleton.module.css";
import Image from "next/image";
import { ComponentProps, FC, useEffect, useRef, useState } from "react";
import { IconType } from "react-icons";
import { MdQuestionMark } from "react-icons/md";

type ImageWithSkeletonProps = ComponentProps<typeof Image> & {
    component?: FC | "img";
    skeleton?: boolean;
    icon?: IconType;
};

const ImageWithSkeleton: FC<ImageWithSkeletonProps> = ({
    component = Image,
    skeleton = false,
    icon,
    ...imageProps
}) => {
    const [status, setStatus] = useState<"loading" | "success" | "failure">(
        skeleton ? "failure" : "loading"
    );
    const { onLoad, ...finalImageProps } = imageProps;
    const Component = component as FC<any>;
    const ref = useRef<HTMLImageElement>();
    const Icon = icon ?? MdQuestionMark;

    useEffect(() => {
        if (ref.current?.complete) {
            setStatus("success");
        }
    }, []);

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
                    ref={ref}
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
                    className={`absolute top-0 left-0 h-[100%] w-[100%] flex items-center justify-center bg-gray-50 shadow  dark:shdaow-none rounded dark:bg-[#222]`}
                >
                    <Icon className="text-4xl text-gray-500" />
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
