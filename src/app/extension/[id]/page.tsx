import ExtensionInfoList from "@/components/Extension/ExtensionInfoList";
import ExtensionSecurity from "@/components/Extension/ExtensionSecurity";
import ImageWithSkeleton from "@/components/Image/ImageWithSkeleton";
import { APIExtension } from "@/types/APIExtension";
import { ServerSidePageProps } from "@/types/ServerSidePageProps";
import { Button, Container } from "@mui/material";
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
    };
}

export default async function ExtensionPage({ params }: ServerSidePageProps) {
    const { id } = params;
    const extension = await getExtensionInformation(id);

    return (
        <Container>
            <main className="my-5 lg:my-10">
                <div className="grid grid-cols-[1fr_3fr_1fr] gap-5">
                    <ImageWithSkeleton
                        component="img"
                        src={extension.icon ?? ""}
                        skeleton={!extension.icon}
                        alt="Extension icon"
                        className="rounded-lg"
                        height={200}
                        width={200}
                    />
                    <ExtensionInfoList extension={extension} />
                    <div className="flex justify-end items-start">
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

                <br />
                <p>{extension.description}</p>
                <br />

                <ExtensionSecurity extension={extension} />
            </main>
        </Container>
    );
}
