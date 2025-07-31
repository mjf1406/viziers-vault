/** @format */

import Header from "./components/Header";

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <div>{children}</div>
        </div>
    );
}
