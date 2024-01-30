"use client";

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { SlOptionsVertical } from "react-icons/sl";
import { MdDeleteOutline } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { deleteUserUrl } from "@/lib/actions/url.actions";
import { useToast } from "./ui/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export const CardShortUrlOptions = ({ id }: { id: string }) => {
  const pathname = usePathname();
  const { toast } = useToast();

  const deleteCard = async () => {
    //TODO confirm dialog
    try {
      await deleteUserUrl(id, pathname);
      toast({
        title: "Deletion successful!",
      });
    } catch (error) {
      toast({
        title: "Error deleting item. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <AlertDialog>
        <Menubar>
          <MenubarMenu>
            <MenubarTrigger className="bg-transparent text-indigo-400 flex gap-2">
              <SlOptionsVertical /> Options
            </MenubarTrigger>
            <MenubarContent>
              <Link href={`dashboard/short-url/${id}`}>
                <MenubarItem className="flex justify-between">
                  Edit
                  <CiEdit size={18} />
                </MenubarItem>
              </Link>
              <MenubarSeparator />
              <AlertDialogTrigger asChild>
                <MenubarItem className="flex justify-between text-red-600 focus:text-red-600">
                  Delete <MdDeleteOutline size={18} />
                </MenubarItem>
              </AlertDialogTrigger>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>

        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to delete this item?
            </AlertDialogTitle>
            <AlertDialogDescription className="bg-red-300 p-4 rounded-md text-gray-700">
              This action is irreversible and will permanently remove associated
              data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={deleteCard}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
