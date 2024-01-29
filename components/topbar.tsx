import Link from "next/link";
import React from "react";

export const Topbar = () => {
  return (
    <nav className="absolute top-0 z-40 w-full py-4 bg-midnight duration-300">
      <div className="flex container pl-4 pr-4 md:pl-0 md:pr-0 items-center justify-between mx-auto">
        <Link
          href="/"
          className="text-white font-bold text-2xl hover:opacity-65 transition-opacity"
        >
          m<span className="text-indigo-400 text-3xl">L</span>
        </Link>

        <Link
          href="/auth"
          className="text-white hover:opacity-65 transition-opacity"
        >
          Sign in
        </Link>
      </div>
    </nav>
  );
};
