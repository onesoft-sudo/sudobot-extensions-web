import { Tarball } from "@/types/APIExtension";
import { sizeFormatter } from "@/utils/formatters";
import { useState } from "react";
import ExtensionChecksumCopy from "./ExtensionChecksumCopy";
import ExtensionDownloadsTablePagination from "./ExtensionDownloadsTablePagination";

type Props = {
    tarballs: Tarball[];
};

export default function ExtensionDownloadsTable({ tarballs }: Props) {
    const entriesPerPage = 5;
    const [currentPage, setCurrentPage] = useState(0);
    const totalEntries = tarballs.length;
    const offset = currentPage * entriesPerPage;
    const onPageChange = (page: number) => setCurrentPage(page);

    return (
        <div className="w-full">
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
                    {tarballs
                        .slice(offset, offset + entriesPerPage)
                        .map((tarball) => (
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
                                <td className="px-6 py-4">{tarball.version}</td>
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

            <ExtensionDownloadsTablePagination
                currentPage={currentPage}
                entriesPerPage={entriesPerPage}
                totalEntries={totalEntries}
                onPageChange={onPageChange}
            />
        </div>
    );
}
