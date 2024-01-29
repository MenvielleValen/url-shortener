import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { SlOptionsVertical } from "react-icons/sl";
import { MdDeleteOutline } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { TfiDashboard } from "react-icons/tfi";
import Link from "next/link";

export const CardShortUrlOptions = ({ id }: { id: string }) => {
  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger className="bg-transparent text-indigo-400 flex gap-2">
          <SlOptionsVertical /> Options
        </MenubarTrigger>
        <MenubarContent>
          <MenubarItem className="flex justify-between">
            Panel
            <TfiDashboard size={18} />
          </MenubarItem>
          <MenubarSeparator />
          <Link href={`dashboard/short-url/${id}`}>
            <MenubarItem className="flex justify-between">
              Edit
              <CiEdit size={18} />
            </MenubarItem>
          </Link>
          <MenubarSeparator />
          <MenubarItem className="flex justify-between text-red-600 focus:text-red-600">
            Delete <MdDeleteOutline size={18} />
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};
