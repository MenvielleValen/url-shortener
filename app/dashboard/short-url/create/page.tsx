import { getServerSession } from "next-auth";
import { authOptions } from "../../../utils/auth";
import { redirect } from "next/navigation";
import { FormLink } from "@/components/Forms/FormLink";
import { ButtonLink } from "@/components/ButtonLink";
import { FaPlus } from "react-icons/fa";

export default async function CreatePage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/auth");
  }

  return (
    <>
      <div className="flex justify-between items-center">
        <div className="flex gap-2 text-white items-center">
          <FaPlus size={28}/>
          <h2 className="text-white text-2xl font-bold">Create New link</h2>
        </div>
        <ButtonLink href={"/dashboard"}>Cancel</ButtonLink>
      </div>
      <hr className="opacity-55"/>
      <div className="flex  p-2  h-[100vh] justify-center items-center">
        <FormLink user={session?.user || null} link={null}/>
      </div>
    </>
  );
}
