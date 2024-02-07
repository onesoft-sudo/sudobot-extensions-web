import { pages } from "@/config/pages";
import logo from "@/images/sudobot.png";
import styles from "@/styles/Navbar.module.css";
import Image from "next/image";
import { HiArrowTopRightOnSquare } from "react-icons/hi2";
import Link from "../Routing/Link";
import NavbarClientSide from "./NavbarClientSide";

export default function Navbar() {
    return (
        <nav className={styles.nav}>
            <a className={styles.logoWrapper} href="/">
                <Image src={logo.src} alt="Logo" height={128} width={128} />
                <span className="mobile">Extensions</span>
                <span className="desktop">SudoBot Extensions</span>
            </a>

            <ul className={`${styles.ul} hidden md:flex`}>
                {pages.map((link) => {
                    const LinkComponent = link.url.startsWith("/") ? Link : "a";
                    const externalLink = /^http(s?):\/\//gi.test(link.url);

                    return (
                        <li key={`${link.url}_${link.name}`}>
                            <LinkComponent
                                href={link.url}
                                {...(externalLink
                                    ? { target: "_blank", rel: "noreferrer" }
                                    : {})}
                                title={link.name}
                                className="flex items-center gap-1"
                            >
                                {link.name}
                                {externalLink && <HiArrowTopRightOnSquare />}
                            </LinkComponent>
                        </li>
                    );
                })}
            </ul>

            <NavbarClientSide />
        </nav>
    );
}
