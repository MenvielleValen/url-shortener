import { Url } from "next/dist/shared/lib/router/router";
import Link from "next/link";
import React, { PropsWithChildren } from "react";

interface ButtonLinkProps {
  href: Url;
}

export const ButtonLink = ({
  children,
  href,
}: PropsWithChildren<ButtonLinkProps>) => {
  return (
    <Link
      href={href}
      className="bg-indigo-500 hover:bg-indigo-600 transition-colors flex items-center justify-center text-white p-2 rounded-md pl-3 pr-3 disabled:opacity-75 disabled:hover:bg-indigo-500 disabled:cursor-not-allowed"
    >
      {children}
    </Link>
  );
};
