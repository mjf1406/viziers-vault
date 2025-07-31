/** @format */

export default function Footer() {
    return (
        <footer className="flex items-center justify-center w-full h-20 border-t">
            <p className="text-sm">
                © {new Date().getFullYear()} Your Company Name. All rights
                reserved.
            </p>
        </footer>
    );
}
