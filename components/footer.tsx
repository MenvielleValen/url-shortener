import Link from "next/link";
import React from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export const Footer = () => {
  return (
    <footer className="fixed bottom-0 mt-6 mb-6 w-full text-gray-500">
      <div className="flex container pl-4 pr-4 md:pl-0 md:pr-0 items-center justify-between mx-auto">
        <p className="text-sm text-gray-400">Made by <Link className="text-indigo-300" href="https://portfolio-menviellevalen.vercel.app/">  Valentín</Link></p>

        <div className="flex gap-2">
          <Link className="text-xl hover:text-indigo-400 transition-colors" href={"https://github.com/MenvielleValen"}><FaGithub/></Link>
          <Link className="text-xl hover:text-indigo-400 transition-colors" href={"https://www.linkedin.com/in/valentinmenviellecandia/"}><FaLinkedin/></Link>
        </div>
      </div>
    </footer>
  );
};
