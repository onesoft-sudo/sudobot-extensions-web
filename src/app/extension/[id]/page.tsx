import ExtensionInfoList from "@/components/Extension/ExtensionInfoList";
import ExtensionSecurity from "@/components/Extension/ExtensionSecurity";
import ExtensionIcon from "@/components/Extension/Extensionicon";
import { Divider } from "@/components/Layout/Divider";
import { APIExtension } from "@/types/APIExtension";
import { ServerSidePageProps } from "@/types/ServerSidePageProps";
import { Button, Container } from "@mui/material";
import { MDXRemote } from "next-mdx-remote/rsc";
import { MdDownload } from "react-icons/md";

async function getExtensionInformation(id: string): Promise<APIExtension> {
    return {
        id,
        name: "Anti RickRoll",
        downloads: 183435,
        author: {
            name: "Ar Rakin",
            isVerified: true,
        },
        description: "Prevent rickroll links from being sent in your server.",
        homepage: "https://example.com",
        issues: "https://github.com/onesoftnet/antirickroll/issues",
        repository: "https://github.com/onesoftnet/antirickroll",
        license: "GPL-3.0-or-later",
        licenseURL: "https://spdx.org/licenses/GPL-3.0-or-later.html",
        icon: "https://res.cloudinary.com/rakinar2/image/upload/v1707213937/antirickroll_qqvfgg.png",
        security: "safe",
        lastUpdated: new Date("2021-10-05T00:00:00Z"),
        readmeFileName: "README.md",
        readmeContents: `# Anti RickRoll\n\nPrevent rickroll links from being sent in your server.\n\n## Installation\n\n1. Go to the [homepage](https://example.com) of the extension.\n2. Click on the "Install" button.\n\n## License\n\nThis extension is licensed under the [GPL-3.0-or-later](https://spdx.org/licenses/GPL-3.0-or-later.html) license.\n\n## Issues\n\nIf you find any issues with the extension, please report them [here](https://example.com).`,
    };
}

export default async function ExtensionPage({ params }: ServerSidePageProps) {
    const { id } = params;
    const extension = await getExtensionInformation(id);

    return (
        <Container>
            <main className="my-5 lg:my-10">
                <div className="grid grid-cols-[80px_auto] md:grid-cols-[1fr_3fr_1fr] gap-3 md:gap-5">
                    <ExtensionIcon icon={extension.icon} />

                    <div className="relative md:hidden">
                        <h1 className="text-2xl md:text-3xl lg:text-4xl">
                            {extension.name}
                        </h1>
                        <p className="text-[#555] dark:text-[#999] text-sm md:text-base break-all pr-2 max-w-[100%]">
                            <code className="font-mono">{extension.id}</code>
                        </p>
                    </div>
                    <div>
                        <div className="relative hidden md:block">
                            <h1 className="text-2xl md:text-3xl lg:text-4xl">
                                {extension.name}
                            </h1>
                            <p className="text-[#555] dark:text-[#999] text-sm md:text-base break-all pr-2 max-w-[100%]">
                                <code className="font-mono">
                                    {extension.id}
                                </code>
                            </p>
                        </div>
                        <ExtensionInfoList
                            className="hidden md:block"
                            extension={extension}
                        />
                    </div>
                    <div className="hidden md:flex md:justify-end items-start">
                        {extension.security === "unsafe" ? (
                            <div className="flex px-2 py-2 items-center gap-2 cursor-not-allowed text-[#555] dark:text-[#999]">
                                <MdDownload className="inline" />
                                Install
                            </div>
                        ) : (
                            <Button startIcon={<MdDownload />}>Install</Button>
                        )}
                    </div>
                </div>

                <div className="md:hidden">
                    <ExtensionInfoList extension={extension} />
                    <br />
                    <div className="flex md:justify-end items-start">
                        {extension.security === "unsafe" ? (
                            <div className="flex text-center px-2 py-2 items-center gap-2 cursor-not-allowed text-[#555] dark:text-[#999]">
                                <MdDownload className="inline" />
                                Install
                            </div>
                        ) : (
                            <Button fullWidth startIcon={<MdDownload />}>
                                Install
                            </Button>
                        )}
                    </div>
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
        </Container>
    );
}
