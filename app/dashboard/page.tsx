import { getServerSession } from "next-auth";
import { authOptions } from "../utils/auth";
import { redirect } from "next/navigation";
import { CardShortUrl } from "@/components/CardShortUrl";
import { findUserUrls } from "@/lib/actions/userUrl.actions";
import { ButtonLink } from "@/components/ButtonLink";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/auth");
  }

  if (!session?.user?.email) {
    redirect("/auth");
  }

  const userUrls = await findUserUrls(session.user.email);

  return (
    <>
      <div className="flex justify-between items-center">
        <h2 className="text-white text-2xl mt-3 font-bold">Dashboard</h2>
        <ButtonLink href={"/dashboard/short-url/create"}>
          Create new link
        </ButtonLink>
      </div>
      <hr className="opacity-55" />
      {userUrls.length === 0 ? (
        <div className="flex justify-center items-center flex-col gap-4">
          <p className="text-white opacity-50 text-3xl">
            You have not created any URL yet
          </p>
        </div>
      ) : (
        <div className="mt-5 flex justify-start items-start flex-wrap gap-2 overflow-y-auto max-h-[70vh]">
          {userUrls.map((x) => (
            <CardShortUrl key={x.id} userUrl={x} />
          ))}
        </div>
      )}
    </>
  );
}
