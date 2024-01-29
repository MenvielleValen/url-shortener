"use client";

import { createUrl } from "@/lib/actions/url.actions";
import Link from "next/link";
import { ChangeEvent, FormEvent, useState } from "react";

export const CreateUrl = () => {
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");

  const onChangeForm = (e: ChangeEvent<HTMLInputElement>) => {
    setLongUrl(e.target.value);
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await createUrl(longUrl);
    setShortUrl(`${window.location.href}s/${res}`);
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-3 justify-center w-2/4">
      <input
        className="p-2 rounded-md focus:outline-none"
        onChange={onChangeForm}
        name="longUrl"
        placeholder="Your URL"
      />
      <button
        className="bg-slate-900 rounded-md p-2 text-white hover:bg-slate-800"
        type="submit"
      >
        Create Short Url
      </button>

      {shortUrl && <Link className="text-emerald-900" href={shortUrl}>{shortUrl}</Link>}
    </form>
  );
};
