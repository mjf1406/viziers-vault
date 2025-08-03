/** @format */

import Hero from "@/components/home/Hero";
import Header from "@/components/home/Header";
import Footer from "@/components/nav/Footer";

export default function Home() {
    return (
        <div>
            <Header />
            <main className="flex flex-col items-center justify-center w-full mx-auto p-4">
                <Hero />
            </main>
            <Footer />
        </div>
    );
}
