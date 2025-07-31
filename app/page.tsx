/** @format */

import Hero from "@/components/home/Hero";
import Header from "@/components/home/Header";

export default function Home() {
    return (
        <div>
            <Header />
            <main className="flex flex-col items-center justify-center w-full mx-auto p-4">
                <Hero />
            </main>
        </div>
    );
}
