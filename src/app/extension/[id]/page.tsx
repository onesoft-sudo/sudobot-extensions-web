import { APIExtension } from "@/types/APIExtension";
import { ServerSidePageProps } from "@/types/ServerSidePageProps";

async function getExtensionInformation(id: string): Promise<APIExtension> {
    return {
        id,
        name: id[0].toUpperCase() + id.substring(1),
        downloads: 0,
        author: {
            name: "Ar Rakin",
        },
        description: "whatever",
    };
}

export default async function ExtensionPage({ params }: ServerSidePageProps) {
    const { id } = params;
    return (
        <main>
            <h1></h1>
        </main>
    );
}
