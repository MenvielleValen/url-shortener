"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UrlSchema } from "@/lib/validations/url";
import { Button as CustomButton } from "@/components/Button";
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
import { createUrl, shortUrlExist, updateUserUrl } from "@/lib/actions/url.actions";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { useToast } from "../ui/use-toast";
import { IoWarningOutline } from "react-icons/io5";

interface FormLinkProps {
  user: {
    name?: string | null | undefined;
    email?: string | null | undefined;
    image?: string | null | undefined;
  } | null;
  link: {
    id: string;
    userEmail: string;
    url: {
      id: string;
      shortUrl: string;
      longUrl: string;
    };
    description?: string;
  } | null;
}

export const FormLink = ({ user, link }: FormLinkProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const { toast } = useToast();

  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof UrlSchema>>({
    resolver: zodResolver(UrlSchema),
    defaultValues: {
      longUrl: link?.url.longUrl || "",
      shortUrl: link?.url.shortUrl || "",
      description: link?.description || "",
      userEmail: user?.email || "",
    },
  });

  const onSubmit = async (values: z.infer<typeof UrlSchema>) => {
    if (link !== null) {
      updateShortUrl(values);
    } else {
      newShortUrl(values);
    }
  };

  const updateShortUrl = async ({
    longUrl,
    description,
    userEmail,
  }: z.infer<typeof UrlSchema>) => {
    try {
      setLoading(true);

      await updateUserUrl(link?.id!, longUrl, description, userEmail, pathname);

      toast({
        title: "Update successful!",
      });

      router.push("/dashboard");
    } catch (error) {
      toast({
        title: "Error updating item. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const newShortUrl = async ({
    longUrl,
    shortUrl,
    description,
    userEmail,
  }: z.infer<typeof UrlSchema>) => {
    try {
      setLoading(true);

      const existShort = await shortUrlExist(shortUrl as string);

      if (existShort) {
        form.setError("shortUrl", {
          message: "This short url already exist, try another or select random",
        });
        return;
      }

      await createUrl(
        longUrl,
        shortUrl as string,
        description,
        userEmail,
        pathname
      );

      toast({
        title: "Creation successful!",
      });

      router.push("/dashboard");
    } catch (error) {
      toast({
        title: "Error deleting item. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const randomShort = async (): Promise<void> => {
    setLoading(true);

    const shortUrl = Base62Converter.toBase62();
    const existShort = await shortUrlExist(shortUrl);

    if (existShort) {
      return randomShort();
    }

    form.setValue("shortUrl", shortUrl);

    setLoading(false);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 md:w-1/2 w-full"
      >
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
          disabled={link !== null}
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
                <CustomButton onClick={randomShort} disabled={link !== null}>
                  Randomize
                </CustomButton>
              </div>
              <FormDescription>
                https://minlink.vercel.app/s/
                {form.getValues().shortUrl?.toLowerCase() ||
                  link?.url.shortUrl?.toLowerCase()}
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
        <CustomButton disabled={loading} type="submit">
          <div className="flex gap-3 justify-between">
            {link !== null ? "Update your Short Url" : "Create your Short Url"}
            {link !== null && <IoWarningOutline size={25}/>}
          </div>
        </CustomButton>
      </form>
    </Form>
  );
};
