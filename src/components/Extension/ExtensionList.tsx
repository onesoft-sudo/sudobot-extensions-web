import { APIExtension } from "@/types/APIExtension";
import { FC } from "react";
import Extension from "./Extension";

async function getExtensionIndex(): Promise<APIExtension[]> {
    // FIXME
    return [
        {
            id: "org.onesoftnet.sbext.antirickroll",
            downloads: 5,
            name: "Anti RickRoll",
            description: "Deletes messages containing rickroll links.",
            author: {
                name: "Ar Rakin",
                isVerified: true,
            },
            icon: "https://loremflickr.com/200/200?i=1",
            license: "GPL-3.0-or-later",
            licenseURL: "https://spdx.org/licenses/GPL-3.0-or-later.html",
            security: "safe",
        },
        {
            id: "org.onesoftnet.antirickroll2",
            downloads: 156666,
            name: "Anti RickRoll 2",
            description: "lorem50  lmao",
            author: {
                name: "LMAO 11",
                isVerified: false,
            },
            icon: "https://loremflickr.com/200/200?i=2",
            license: "GPL-3.0-or-later",
            licenseURL: "https://spdx.org/licenses/GPL-3.0-or-later.html",
            security: "safe",
        },
    ];
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
