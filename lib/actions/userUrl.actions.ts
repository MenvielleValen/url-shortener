"use server";

import Url from "../models/url.model";
import UserUrl from "../models/user-url";
import { connectToDB } from "../mongoose";

export const findUserUrls = async (userEmail: string): Promise<any[]> => {
  await connectToDB();
  try {
    const userUrls = await UserUrl.find({ userEmail }).populate({
      path: 'url',
      model: Url
    }).exec();
    return userUrls;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
