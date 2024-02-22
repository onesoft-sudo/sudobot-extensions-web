import { Button } from "@mui/material";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

type Props = {
    currentPage: number;
    totalEntries: number;
    entriesPerPage: number;
    onPageChange: (page: number) => void;
};

export default function ExtensionDownloadsTablePagination({
    currentPage,
    entriesPerPage,
    onPageChange,
    totalEntries,
}: Props) {
    return (
        <div className="flex items-center justify-between px-4 py-2 bg-gray-50 dark:bg-[rgba(255,255,255,0.1)] rounded-b-lg">
            <p className="text-sm text-gray-500 dark:text-gray-400">
                Showing <strong>{currentPage * entriesPerPage + 1}</strong> to{" "}
                <strong>
                    {Math.min((currentPage + 1) * entriesPerPage, totalEntries)}
                </strong>{" "}
                of <strong>{totalEntries}</strong> entries
            </p>
            <div>
                <Button
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 0}
                    sx={{ minWidth: 0, px: 1 }}
                >
                    <MdChevronLeft size="1.4em" />
                </Button>
                <Button
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={
                        currentPage + 1 ===
                        Math.ceil(totalEntries / entriesPerPage)
                    }
                    sx={{ minWidth: 0, px: 1 }}
                >
                    <MdChevronRight size="1.4em" />
                </Button>
            </div>
        </div>
    );
}
