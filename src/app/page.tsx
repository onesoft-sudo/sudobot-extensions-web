import ExtensionList from "@/components/Extension/ExtensionList";
import sudobotLogo from "@/images/sudobot-v8.png";
import styles from "@/styles/Home.module.css";
import { Container } from "@mui/material";
import Image from "next/image";

export default function Home() {
    return (
        <main className="mb-5">
            <div className={`bg-white dark:shadow-gray-700 pb-5 ${styles.top}`}>
                <div className="md:flex justify-center items-center pt-5">
                    <div className="md:w-[50vw] lg:w-[40vw] xl:w-[30vw]">
                        <Image
                            src={sudobotLogo}
                            alt="SudoBot Logo"
                            width={512}
                            height={512}
                            blurDataURL={sudobotLogo.blurDataURL}
                            placeholder="empty"
                            className="w-[100%] md:w-[50vw] lg:w-[40vw] xl:w-[30vw] block"
                        />
                    </div>
                    <h1 className="text-center text-3xl lg:text-4xl xl:text-5xl text-blue-400">
                        Extensions
                    </h1>
                </div>
                <div className="h-[5px] w-[20vw] md:w-[15vw] lg:w-[10vw] bg-blue-300 mx-auto my-5 rounded-md"></div>
                <p className="text-center mt-4 px-3">
                    Explore and install officially supported extensions for
                    SudoBot.
                </p>
            </div>

            <br />
            <br />

            <Container>
                <div>
                    <ExtensionList />
                </div>
            </Container>
        </main>
    );
}
