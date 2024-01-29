"use client";
import { useState } from "react";
import { LuCopy } from "react-icons/lu";
import { LuCopyCheck } from "react-icons/lu";
import { FaRegCheckCircle } from "react-icons/fa";
import { useToast } from "./ui/use-toast";
interface CoppyButtonProps {
  text: string;
}

export const CoppyButton = ({ text }: CoppyButtonProps) => {
  const { toast } = useToast()
  const [copy, setCopy] = useState(false);

  const onCopy = () => {
    setCopy(true);
    navigator.clipboard.writeText(text);
    toast({
      title: 'Content copied to clipboard',
    })
    setTimeout(() => {
      setCopy(false);
    }, 2000);
  };
  return (
    <>
      {!copy ? (
        <LuCopy
          onClick={onCopy}
          className="cursor-pointer hover:opacity-70 transition-opacity text-indigo-400"
          size={20}
        />
      ) : (
        <FaRegCheckCircle className="cursor-pointer text-indigo-400" size={20} />
      )}
    </>
  );
};
