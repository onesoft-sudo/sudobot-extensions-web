import { LocalStorageSystemInstance } from "@/types/SystemInstance";
import { atom } from "recoil";
import { v4 as uuid } from "uuid";

const ExtensionPageState = atom({
    key: "extensionPageState",
    default: {
        downloadModalOpen: false,
        installModalOpen: false,
        instances: [
            {
                id: uuid(),
                url: "https://www.sudobot.org",
            },
            {
                id: uuid(),
                url: "https://whatever.org",
            },
        ] as LocalStorageSystemInstance[],
        selectedInstanceIds: [] as string[],
    },
});

export default ExtensionPageState;
