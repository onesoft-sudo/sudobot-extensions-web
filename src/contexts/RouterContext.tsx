"use client";

import EventEmitter from "events";
import {
    PropsWithChildren,
    createContext,
    useContext,
    useEffect,
    useId,
    useState,
} from "react";

type RouterContextType = {
    id: string;
};

export const RouterContext = createContext<RouterContextType>(
    {} as RouterContextType
);

const globalEventEmitters = new Map<string, EventEmitter>();
const idsToClean: string[] = [];

export const RouterContextProvider = ({ children }: PropsWithChildren) => {
    const id = useId();

    if (!globalEventEmitters.has(id)) {
        globalEventEmitters.set(id, new EventEmitter());

        if (idsToClean.length > 0) {
            for (const idToClean of idsToClean) {
                globalEventEmitters.delete(idToClean);
            }

            idsToClean.length = 0;
        }
    }

    useEffect(() => {
        return () => void idsToClean.push(id);
    }, []);

    return (
        <RouterContext.Provider value={{ id }}>
            {children}
        </RouterContext.Provider>
    );
};

export function useRouterContext() {
    return useContext(RouterContext);
}

export function useRouterEvents() {
    const { id } = useRouterContext();
    return globalEventEmitters.get(id);
}

export function useRouteChanging() {
    const events = useRouterEvents();
    const [isChanging, setIsChanging] = useState(false);

    useEffect(() => {
        const routeChangeStartListener = () => setIsChanging(true);
        const routeChangeCompleteListener = () => setIsChanging(false);

        events?.on("routeChangeStart", routeChangeStartListener);
        events?.on("routeChangeComplete", routeChangeCompleteListener);

        return () => {
            events?.off("routeChangeStart", routeChangeStartListener);
            events?.off("routeChangeComplete", routeChangeCompleteListener);
        };
    }, [events]);

    return isChanging;
}
