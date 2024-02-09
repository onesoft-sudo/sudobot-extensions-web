import { INDEX_URL } from "@/config/urls";
import { getDB } from "@/firebase/app";
import { PartialAPIExtension } from "@/types/APIExtension";
import { FC, cache } from "react";
import Extension from "./Extension";

const getDocs = cache(async () => {
    const db = getDB()

    if (!db) {
        return {}
    }

    const snapshot = await db.collection('extensions').get();
    const record: Record<string, PartialAPIExtension> = {};

    for (const doc of snapshot.docs) {
        if (!doc.exists) {
            continue;
        }

        record[doc.id] = doc.data() as PartialAPIExtension;
    }

    return record;
});

async function getExtensionIndex(): Promise<PartialAPIExtension[]> {
    const response = await fetch(INDEX_URL, {
        next: {
            revalidate: 180
        }
    });
    const extensionMap: Record<string, PartialAPIExtension & { iconURL?: string }> = await response.json();
    const docs = await getDocs();
    const extensions = [];

    for (const id in extensionMap) {
        const doc = docs[id];

        if (!doc) {
            continue;
        }

        const extension = {
            ...extensionMap[id],
            id,
            downloads: doc.downloads,
            security: doc.security,
            icon: extensionMap[id].iconURL,
            author: doc.author ? {
                name: doc.author?.name,
                github: doc.author.github,
                isVerified: doc.author?.isVerified
            } : undefined
        } satisfies PartialAPIExtension;

        extensions.push(extension);
    }

    return extensions;
}

const ExtensionList: FC = async () => {
    const extensions = await getExtensionIndex();

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {extensions.map((extension, index) => (
                <Extension key={index} extension={extension} />
            ))}
        </div>
    );
};

export default ExtensionList;
