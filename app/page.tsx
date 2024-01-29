import { ButtonLink } from "@/components/button-link";
import { CreateUrl } from "@/components/create-url";
import { IoIosLink } from "react-icons/io";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-2 gap-3">
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
        <ButtonLink href="/auth">Getting started 🚀</ButtonLink>
      </div>
      {/* <CreateUrl/> */}
    </main>
  );
}
