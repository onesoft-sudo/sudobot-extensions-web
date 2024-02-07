import ExtensionControls from "@/components/Extension/ExtensionControls";
import ExtensionInfoList from "@/components/Extension/ExtensionInfoList";
import ExtensionSecurity from "@/components/Extension/ExtensionSecurity";
import ExtensionIcon from "@/components/Extension/Extensionicon";
import { Divider } from "@/components/Layout/Divider";
import { INDEX_URL } from "@/config/urls";
import { getDB } from "@/firebase/app";
import { APIExtension } from "@/types/APIExtension";
import { ServerSidePageProps } from "@/types/ServerSidePageProps";
import { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";
import { HiShieldCheck } from "react-icons/hi2";

export const revalidate = 3600;

const getExtensionDoc = async (id: string) => {
    const db = getDB();
    const extensionRef = db.collection("extensions").doc(id);
    const doc = await extensionRef.get();
    const data = doc.data();
    return { doc, data: doc.exists && data ? data : null };
};

async function getExtensionInformation(
    id: string
): Promise<APIExtension | null> {
    const response = await fetch(INDEX_URL, {
        next: {
            revalidate: 180,
        },
    });
    const index = await response.json();
    const extensionInfo = index[id];

    if (!extensionInfo) {
        return null;
    }

    const { doc, data } = await getExtensionDoc(id);

    if (!data) {
        return null;
    }

    const extensionUpdateTime = new Date(extensionInfo.updatedAt);
    const readmeContents = extensionInfo.readmeFileURL
        ? await fetch(extensionInfo.readmeFileURL, {
              next: {
                  revalidate: 180,
              },
          }).then((res) => res.text())
        : undefined;

    return {
        id,
        name: extensionInfo.name,
        downloads: data.downloads,
        author: {
            name: data.author.name,
            isVerified: data.author.isVerified,
            github: data.author.github
                ? `https://github.com/${encodeURIComponent(data.author.github)}`
                : undefined,
        },
        description: extensionInfo.description,
        homepage: extensionInfo.homepage,
        issues: extensionInfo.issues,
        repository: extensionInfo.repository,
        license: extensionInfo.license,
        licenseURL: extensionInfo.licenseURL,
        icon: extensionInfo.iconURL,
        security: data.security,
        lastUpdated:
            extensionUpdateTime.getTime() > doc.updateTime!.toMillis()
                ? extensionUpdateTime
                : doc.updateTime!.toDate(),
        readmeFileName: extensionInfo.readmeFileName,
        readmeContents,
    };
}

export async function generateMetadata({
    params,
}: ServerSidePageProps): Promise<Metadata> {
    const { id } = params;
    const extension = await getExtensionInformation(id);

    if (!extension) {
        return {};
    }

    return {
        title: `${extension.name} - SudoBot Extension Marketplace`,
        description: extension.description,
        openGraph: {
            images: extension.icon,
        },
    };
}

export default async function ExtensionPage({ params }: ServerSidePageProps) {
    const { id } = params;
    const extension = await getExtensionInformation(id);

    if (!extension) {
        notFound();
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <main className="my-5 lg:my-10">
                <div className="flex flex-col md:flex-row items-start justify-between gap-3 md:gap-5">
                    <div className="flex items-start gap-3 md:gap-5 lg:gap-7">
                        <ExtensionIcon icon={extension.icon} />
                        <div>
                            <h1 className="text-2xl md:text-3xl lg:text-4xl">
                                {extension.name}
                            </h1>
                            <p className="text-[#555] dark:text-[#999] text-sm md:text-base break-all pr-2 max-w-[100%]">
                                <code className="font-mono">
                                    {extension.id}
                                </code>
                            </p>
                            {extension.security === "safe" && (
                                <p className="flex items-center gap-1 mt-1 text-green-500 dark:text-green-400 text-sm md:text-base break-all pr-2 max-w-[100%]">
                                    <HiShieldCheck className="inline" /> Secure
                                </p>
                            )}

                            <ExtensionInfoList
                                extension={extension}
                                className="hidden md:block"
                            />
                        </div>
                    </div>
                    <ExtensionInfoList
                        extension={extension}
                        className="md:hidden"
                    />
                    <ExtensionControls extension={extension} />
                </div>

                <br />
                <p>{extension.description}</p>
                <br />

                <ExtensionSecurity extension={extension} />

                {extension.readmeFileName && extension.readmeContents && (
                    <>
                        <h2 className="text-3xl font-bold mt-8">
                            {extension.readmeFileName}
                        </h2>

                        <Divider />

                        <div className="prose dark:prose-invert prose-h1:text-2xl prose-h2:text-xl prose-h3:text-lg prose-h4:text-base prose-h5:text-base prose-h6:text-base prose-h6:uppercase">
                            <MDXRemote
                                source={extension.readmeContents}
                                options={{
                                    mdxOptions: {
                                        format: "md",
                                    },
                                }}
                            />
                        </div>
                    </>
                )}
                <Divider />

                <p className="text-[#555] dark:text-[#999] text-sm text-center">
                    Copyright &copy; OSN Inc, {new Date().getFullYear()}. Not
                    affiliated with Discord, Inc. Copyright of the extensions go
                    to their respective owners.
                </p>
            </main>
        </div>
    );
}
