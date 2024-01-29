"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UrlSchema } from "@/lib/validations/url";
import { Button as CustomButton } from "@/components/Button";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { Base62Converter } from "@/lib/base62";
import { Textarea } from "../ui/textarea";
import { createUrl, shortUrlExist } from "@/lib/actions/url.actions";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

interface FormLinkProps {
  user: {
    name?: string | null | undefined;
    email?: string | null | undefined;
    image?: string | null | undefined;
  } | null;
}

export const FormLink = ({ user }: FormLinkProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof UrlSchema>>({
    resolver: zodResolver(UrlSchema),
    defaultValues: {
      longUrl: "",
      shortUrl: "",
      description: "",
      userEmail: user?.email || "",
    },
  });

  const onSubmit = async ({
    longUrl,
    shortUrl,
    description,
    userEmail,
  }: z.infer<typeof UrlSchema>) => {

    setLoading(true);

    const existShort = await shortUrlExist(shortUrl);

    if(existShort){
        form.setError('shortUrl', {message: 'This short url already exist, try another or select random'});
        return;
    }

    await createUrl(longUrl, shortUrl, description, userEmail, pathname);

    setLoading(false);

    router.push("/dashboard");
  };

  const randomShort = async(): Promise<void> => {
    setLoading(true);

    const shortUrl = Base62Converter.toBase62();
    const existShort = await shortUrlExist(shortUrl);

    if(existShort){
        return randomShort();
    }

    form.setValue("shortUrl", shortUrl);

    setLoading(false);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 md:w-1/2 w-full">
        <FormField
          control={form.control}
          name="longUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Enter the URL here:</FormLabel>
              <FormControl>
                <Input
                  className="text-indigo-500"
                  placeholder="https://"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="shortUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">
                Custom short (max 8):
              </FormLabel>
              <div className="flex gap-2">
                <FormControl>
                  <Input
                    className="text-indigo-500"
                    placeholder="Custom short"
                    maxLength={8}
                    {...field}
                  />
                </FormControl>
                <CustomButton onClick={randomShort}>Randomize</CustomButton>
              </div>
              <FormDescription>
                https://minlink.vercel.app/s/{form.getValues().shortUrl}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">
                Description (optional):
              </FormLabel>
              <FormControl>
                <Textarea
                  className="text-indigo-500"
                  rows={8}
                  maxLength={200}
                  placeholder=""
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <CustomButton disabled={loading} type="submit">Create your Short Url</CustomButton>
      </form>
    </Form>
  );
};
