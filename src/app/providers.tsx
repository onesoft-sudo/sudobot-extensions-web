import { RouterContextProvider } from "@/contexts/RouterContext";
import { PropsWithChildren } from "react";
import MUIProvider from "./mui";
import RecoilProvider from "./recoil";

export default function Providers({ children }: PropsWithChildren) {
    return (
        <MUIProvider>
            <RouterContextProvider>
                <RecoilProvider>{children}</RecoilProvider>
            </RouterContextProvider>
        </MUIProvider>
    );
}
