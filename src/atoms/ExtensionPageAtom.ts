import { atom } from "recoil";

const ExtensionPageState = atom({
    key: "extensionPageState",
    default: {
        downloadModalOpen: false,
    },
});

export default ExtensionPageState;
