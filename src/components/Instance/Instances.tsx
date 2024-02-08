import ExtensionPageAtom from "@/atoms/ExtensionPageAtom";
import { SystemInstance } from "@/types/SystemInstance";
import { useRecoilValue } from "recoil";
import Instance from "./Instance";

type Props = {
    instances?: SystemInstance[];
};

export default function Instances({ instances: systemInstances }: Props) {
    const localStorageInstances = useRecoilValue(ExtensionPageAtom).instances;
    const instances = systemInstances ?? localStorageInstances;

    return (
        <div>
            {instances?.map((instance) => (
                <Instance key={instance.id} instance={instance} />
            ))}
        </div>
    );
}
