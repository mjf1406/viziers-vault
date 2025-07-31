export default function Footer() {
  return (
    <footer className="flex items-center justify-center w-full h-20 bg-gray-100 dark:bg-gray-800">
      <p className="text-sm text-gray-600 dark:text-gray-400">
        © {new Date().getFullYear()} Your Company Name. All rights reserved.
      </p>
    </footer>
  );
}