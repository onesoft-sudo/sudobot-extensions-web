"use client";

import ExtensionPageAtom from "@/atoms/ExtensionPageAtom";
import useLocalStorage from "@/hooks/useLocalStorage";
import { LocalStorageSystemInstance } from "@/types/SystemInstance";
import { PropsWithChildren } from "react";
import { MutableSnapshot, RecoilRoot } from "recoil";

export default function RecoilProvider({ children }: PropsWithChildren) {
    const [get] = useLocalStorage("global_state");

    const initializeState = (snapshot: MutableSnapshot) => {
        const persisted = get();

        if (persisted) {
            const persistedState = JSON.parse(persisted);

            if ("instances" in persistedState) {
                snapshot.set(ExtensionPageAtom, {
                    instances: [
                        ...persistedState.instances,
                    ] as LocalStorageSystemInstance[],
                    downloadModalOpen: false,
                    installModalOpen: false,
                });
            }
        }
    };

    return (
        <RecoilRoot initializeState={initializeState}>{children}</RecoilRoot>
    );
}
