import { useEffect, useState } from "react";

export default function useClientInitialized() {
    const [initialized, setInitialized] = useState(false);

    useEffect(() => {
        setInitialized(true);
    }, []);

    return initialized;
}
