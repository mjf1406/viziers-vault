/** @format */

import Hero from "@/components/home/Hero";
import Header from "@/components/nav/Header";

export default function Home() {
    return (
        <>
            <Header />
            <main className="flex flex-col items-center justify-center w-full mx-auto p-4">
                <Hero />
            </main>
        </>
    );
}
