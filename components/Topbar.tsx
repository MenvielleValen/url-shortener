import { authOptions } from "@/app/utils/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";
import React from "react";
import { LogoutButton } from "./LogoutButton";
import Image from "next/image";

export const Topbar = async () => {
  const session = await getServerSession(authOptions);

  return (
    <nav className="w-full flex py-4">
      <div className="flex justify-between w-full items-center">
        <Link
          href="/"
          className="text-white font-bold text-2xl hover:opacity-65 transition-opacity"
        >
          m<span className="text-indigo-400 text-3xl">L</span>
        </Link>

        {session ? (
          <div className="flex gap-2 items-center">
            <Image className="rounded-full" src={session.user?.image || ''} width={30} height={30} alt={`Avatar ${session.user?.name}`}/>
            <p className="text-white hover:select-none">
              {session.user?.name?.split(' ')[0]}
            </p>
            <LogoutButton />
            </div>
        ) : (
          <Link
            href="/auth"
            className="text-white hover:opacity-65 transition-opacity"
          >
            Sign in
          </Link>
        )}
      </div>
    </nav>
  );
};
