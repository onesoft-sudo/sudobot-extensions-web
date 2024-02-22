import ExtensionPageAtom from "@/atoms/ExtensionPageAtom";
import { SystemInstance } from "@/types/SystemInstance";
import { MdWarning } from "react-icons/md";
import { useRecoilValue } from "recoil";

type Props = {
    instances?: SystemInstance[];
};

export default function Instances({ instances: systemInstances }: Props) {
    const localStorageInstances = useRecoilValue(ExtensionPageAtom).instances;
    const instances = systemInstances ?? localStorageInstances;

    return (
        <div>
            {/* {instances?.map((instance) => (
                <Instance key={instance.id} instance={instance} />
            ))} */}

            {instances?.length !== 0 && (
                <p className="text-xl my-5 md:my-7 lg:my-10 text-[#555] dark:text-[#999] flex items-center justify-center gap-2">
                    <MdWarning className="inline" /> No instances found.
                </p>
            )}
        </div>
    );
}
