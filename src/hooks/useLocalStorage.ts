"use client";

import { useCallback } from "react";
import useClientInitialized from "./useClientInitialized";

export default function useLocalStorage<T = any>(key: string) {
    const initialized = useClientInitialized();

    const get = useCallback((): T | undefined => {
        if (!initialized) {
            return;
        }

        const value = localStorage.getItem(key);

        if (value) {
            return JSON.parse(value);
        }
    }, [initialized]);

    const set = useCallback(
        (value: T) => {
            if (!initialized) {
                return;
            }

            localStorage.setItem(key, JSON.stringify(value));
        },
        [initialized]
    );

    return [get, set] as const;
}
