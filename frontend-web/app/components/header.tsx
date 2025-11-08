"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import clsx from "clsx";

export default function Header() {
  const pathname = usePathname();

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/chat", label: "Chat" },
    { href: "/about", label: "About" },
  ];

  return (
    <header className="flex items-center justify-between px-6 py-3 shadow-sm bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md sticky top-0 z-50 border-b border-zinc-200 dark:border-zinc-800">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2">
        <Image
          src="/logo.png"
          alt="HealthAI Logo"
          width={28}
          height={28}
          className="dark:invert"
        />
        <span className="text-lg font-semibold text-blue-600 dark:text-cyan-300">
          HealthAI
        </span>
      </Link>

      {/* Navigation Links */}
      <nav className="flex items-center gap-6 text-sm font-medium">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={clsx(
              "transition-colors hover:text-blue-600 dark:hover:text-cyan-300",
              pathname === link.href
                ? "text-blue-600 dark:text-cyan-300 font-semibold"
                : "text-gray-700 dark:text-gray-300"
            )}
          >
            {link.label}
          </Link>
        ))}

        {/* Sign In Button */}
        <Link
          href="/login"
          className="px-3 py-1 rounded-md text-white bg-blue-600 dark:bg-cyan-400 hover:bg-blue-700 dark:hover:bg-cyan-300 transition"
        >
          Sign In
        </Link>
      </nav>
    </header>
  );
}
