import ImageWithSkeleton from "@/components/Image/ImageWithSkeleton";
import Navbar from "@/components/Navigation/Navbar";
import sudobotLogo from "@/images/sudobot-v8.png";

export default function Home() {
    return (
        <main className="mb-5">
            <div className="bg-white dark:bg-[rgba(255,255,255,0.1)] dark:shadow-gray-700 pb-5">
                <Navbar />
                <div className="md:flex justify-center items-center pt-5">
                    <div className="md:w-[50vw] lg:w-[40vw] xl:w-[30vw]">
                        <ImageWithSkeleton
                            src={sudobotLogo}
                            alt="SudoBot Logo"
                            width={512}
                            height={512}
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
        </main>
    );
}
