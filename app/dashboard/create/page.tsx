import { getServerSession } from "next-auth";
import { authOptions } from "../../utils/auth";
import { redirect } from "next/navigation";
import { FormLink } from "@/components/Forms/FormLink";
import { ButtonLink } from "@/components/ButtonLink";

export default async function CreatePage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/auth");
  }

  return (
    <>
      <div className="flex justify-between items-center">
        <h2 className="text-white text-2xl mt-3 font-bold">Create New link</h2>
        <ButtonLink href={"/dashboard"}>Cancel</ButtonLink>
      </div>
      <hr className="opacity-55"/>
      <div className="flex  p-2  h-[100vh]">
        <FormLink user={session?.user || null} />
      </div>
    </>
  );
}
