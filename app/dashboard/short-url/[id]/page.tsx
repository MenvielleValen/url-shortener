import { getServerSession } from "next-auth";
import { authOptions } from "../../../utils/auth";
import { redirect} from "next/navigation";
import { ButtonLink } from "@/components/ButtonLink";
import { findUserUrlById } from "@/lib/actions/userUrl.actions";
import { FormLink } from "@/components/Forms/FormLink";

export default async function EditPage({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  const link = await findUserUrlById(params.id);

  if(!link || !session?.user){
    redirect('/dashboard');
  }

  const transformLink = {
    id: link.id,
    userEmail: link.userEmail,
    url: {
      id: link.url.id,
      shortUrl: link.url.shortUrl,
      longUrl: link.url.longUrl,
    },
    description: link.description
  }

   return (
    <>
      <div className="flex justify-between items-center">
        <h2 className="text-white text-2xl mt-3 font-bold">Edit Link</h2>
        <ButtonLink href={"/dashboard"}>Cancel</ButtonLink>
      </div>
      <hr className="opacity-55"/>
      <div className="flex  p-2  h-[100vh]">
        { link !== null &&
            <FormLink link={transformLink} user={session.user}/>
        }
      </div>
    </>
  );
}
