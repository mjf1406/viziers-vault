/** @format */

export default function Footer() {
    return (
        <footer className="flex items-center justify-center w-full h-20 border-t">
            <p className="text-sm text-gray-600 dark:text-gray-400">
                © {new Date().getFullYear()} Your Company Name. All rights
                reserved.
            </p>
        </footer>
    );
}
