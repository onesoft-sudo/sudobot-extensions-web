import Link from "next/link";

const links = [
    {
        href: "https://www.sudobot.org",
        label: "Home",
    },
    {
        href: "https://docs.sudobot.org",
        label: "Docs",
    },
    {
        href: "#explore",
        label: "Explore",
    },
];

export default function Navbar() {
    return (
        <nav>
            <div className="flex justify-center md:justify-between items-center pb-5 pt-5 px-10 bg-white dark:bg-[rgba(255,255,255,0.03)] dark:shadow-gray-700">
                <h1 className="hidden md:block text-2xl lg:text-3xl xl:text-4xl text-blue-300">
                    SudoBot Extensions
                </h1>
                <div className="flex items-center space-x-5">
                    {links.map(({ href, label }) => {
                        return (
                            <Link
                                key={`${href}${label}`}
                                href={href}
                                className="text-blue-300 hover:text-blue-400 dark:text-blue-400 dark:hover:text-blue-300"
                            >
                                {label}
                            </Link>
                        );
                    })}
                </div>
            </div>
        </nav>
    );
}
