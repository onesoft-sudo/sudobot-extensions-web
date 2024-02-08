"use client";

import ExtensionPageState from "@/atoms/ExtensionPageAtom";
import { APIExtension } from "@/types/APIExtension";
import { sizeFormatter } from "@/utils/formatters";
import { Button, Modal } from "@mui/material";
import { MdClose, MdDownload } from "react-icons/md";
import { useRecoilState } from "recoil";
import ExtensionChecksumCopy from "./ExtensionChecksumCopy";

type Props = {
    extension: APIExtension;
};

export default function ExtensionDownloadModal({ extension }: Props) {
    const [state, setState] = useRecoilState(ExtensionPageState);
    const onClose = () =>
        setState((state) => ({ ...state, downloadModalOpen: false }));

    return (
        <Modal
            open={state.downloadModalOpen}
            onClose={onClose}
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                "@media (max-width: 640px)": {
                    marginTop: "10%",
                },
            }}
        >
            <div className="bg-white shadow dark:shdaow-none dark:bg-[#222] w-[90%] md:w-[50%] h-[82%] md:h-[60%] rounded-lg relative">
                <div className="p-4 rounded-t-lg flex items-center justify-between">
                    <h1 className="text-xl md:text-2xl font-semibold text-[#333] dark:text-[#ddd]">
                        <MdDownload className="inline" /> Download{" "}
                        {extension.name}
                    </h1>
                    <Button onClick={onClose} sx={{ minWidth: 0, px: 1 }}>
                        <MdClose size="1.4em" />
                    </Button>
                </div>
                <hr className="border-t dark:border-[#444]" />
                <div className="p-4 h-[70%] overflow-y-scroll">
                    <p className="text-sm md:text-base text-[#555] dark:text-[#999]">
                        The downloads for{" "}
                        <strong className="font-semibold">
                            {extension.name}
                        </strong>{" "}
                        are listed below. You can download the latest version of
                        the extension from the list.
                        <br />
                        Just in case if you find something wrong with the
                        extension, please report us at{" "}
                        <a
                            href="mailto:support@onesoftnet.eu.org"
                            className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                        >
                            support@onesoftnet.eu.org
                        </a>
                        .
                    </p>
                    <br />

                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg mb-5">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-[rgba(255,255,255,0.1)] dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        File
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Version
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Size
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Checksum
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Link
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {extension.tarballs.map((tarball) => (
                                    <tr
                                        key={tarball.checksum}
                                        className="odd:bg-white odd:dark:bg-[#333] even:bg-gray-50 even:dark:bg-[rgba(255,255,255,0.13)] border-b dark:border-gray-700"
                                    >
                                        <th
                                            scope="row"
                                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                        >
                                            {tarball.basename}
                                        </th>
                                        <td className="px-6 py-4">
                                            {tarball.version}
                                        </td>
                                        <td className="px-6 py-4">
                                            {sizeFormatter.format(tarball.size)}
                                        </td>
                                        <td className="px-6 py-4">
                                            <ExtensionChecksumCopy
                                                checksum={tarball.checksum}
                                            />
                                        </td>
                                        <td className="px-6 py-4">
                                            <a
                                                href={tarball.url}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                            >
                                                Download
                                            </a>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="rounded-b-lg flex justify-end gap-4 p-4 absolute bottom-0 left-0 w-[100%] z-[10000] bg-white dark:bg-[#222] [box-shadow:0_-1px_1px_0_rgba(0,0,0,0.1)] dark:[box-shadow:0_0_1px_0_rgba(255,255,255,0.4)]">
                        <Button onClick={onClose} variant="outlined">
                            Cancel
                        </Button>
                    </div>
                </div>
            </div>
        </Modal>
    );
}
