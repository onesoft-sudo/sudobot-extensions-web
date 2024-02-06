import { pages } from "@/config/pages";
import styles from "@/styles/Drawer.module.css";
import { Button } from "@mui/material";
import { HiArrowTopRightOnSquare } from "react-icons/hi2";
import { MdClose } from "react-icons/md";

export default function Drawer({
    onClose,
    isOpen,
}: {
    onClose: () => unknown;
    isOpen: boolean;
}) {
    return (
        <>
            <aside
                className={`${styles.aside} ${
                    isOpen ? styles.open : styles.closed
                }`}
            >
                <div className={styles.controls}>
                    <div className="ml-2 flex flex-col items-center leading-[1px]">
                        <div className="text-lg">SudoBot</div>
                        <div className="[letter-spacing:0.1em] text-xs text-center text-[#999] pl-[2px] -mt-1">
                            Extensions
                        </div>
                    </div>

                    <Button
                        style={{ minWidth: 0 }}
                        className="!text-black dark:!text-white"
                        onClick={onClose}
                    >
                        <MdClose size={20} />
                    </Button>
                </div>

                <div className="relative">
                    <ul
                        className={styles.list}
                        style={{
                            width: "90%",
                        }}
                    >
                        {pages.map((link) => (
                            <li
                                key={`${link.url}_${link.name}`}
                                className={styles.listItem}
                            >
                                <a
                                    href={link.url}
                                    {...(/^http(s?):\/\//gi.test(link.url)
                                        ? {
                                              target: "_blank",
                                              rel: "noreferrer",
                                          }
                                        : {})}
                                    title={link.name}
                                    className={styles.listItemAnchor}
                                    onClick={onClose}
                                >
                                    <span>{link.name}</span>
                                    {/^http(s?):\/\//gi.test(link.url) && (
                                        <HiArrowTopRightOnSquare />
                                    )}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </aside>
            <div
                className={`${styles.overlay} ${
                    isOpen ? styles.openOverlay : styles.closedOverlay
                }`}
                onClick={isOpen ? onClose : undefined}
            ></div>
        </>
    );
}
