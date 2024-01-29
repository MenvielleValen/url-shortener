"use server";

import { revalidatePath } from "next/cache";
import { Url } from "../models/url.model";
import { UserUrl } from "../models/user-url";
import { connectToDB } from "../mongoose";

export const shortUrlExist = async (shortUrl: string): Promise<boolean> => {
  await connectToDB();
  try {
    const exist = await Url.findOne({ shortUrl });
    return Promise.resolve(exist !== null);
  } catch (error) {
    throw error;
  }
};

export async function createUrl(
  longUrl: string,
  shortUrl: string,
  description: string,
  userEmail: string,
  pathname: string
): Promise<any> {
  try {
    await connectToDB();

    const url = new Url({
      longUrl,
      shortUrl: shortUrl,
    });

    const createModel = await url.save();

    const userUrl = new UserUrl({
      userEmail,
      url: createModel.id,
      description: description,
    });

    const createUserUrl = await userUrl.save();

    revalidatePath(pathname);

    return true;
  } catch (error) {
    throw error;
  }
}
