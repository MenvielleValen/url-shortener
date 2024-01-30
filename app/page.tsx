import { ButtonLink } from "@/components/ButtonLink";
import { getServerSession } from "next-auth";
import { IoIosLink } from "react-icons/io";
import { authOptions } from "./utils/auth";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <section className="flex flex-col gap-4 md:w-1/4 mx-auto h-[100vh] items-center justify-center">
      <div className="flex flex-col justify-center items-center">
        <div className="flex items-center">
          <h1 className="text-white text-4xl font-bold hover:select-none">
            Min<span className="text-indigo-500 text-5xl">Link</span>
          </h1>
          <IoIosLink className="text-white text-4xl hover:select-none"/>
        </div>
        <p className="text-sm text-neutral-300 text-center">
          Create your custom shortened URLs
        </p>
      </div>
      <div>
        <ButtonLink href={session ? "/dashboard" : "/auth"}>{session ? "My dashboard ✈️" : "Getting started 🚀"}</ButtonLink>
      </div>
      {
        session && (<p className="text-white text-center">Welcome <span className="font-bold text-indigo-400">{session.user?.name?.split(' ')[0]}</span></p>)
      }
    </section>
  );
}
