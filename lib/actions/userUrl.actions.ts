"use server";

import Url from "../models/url.model";
import UserUrl from "../models/user-url.model";
import { connectToDB } from "../mongoose";

export const findUserUrls = async (userEmail: string): Promise<any[]> => {
   connectToDB();
  try {
    const userUrls = await UserUrl.find({ userEmail }).populate({
      path: 'url',
      model: Url
    }).exec();
    return userUrls;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const findUserUrlById = async(id: string): Promise<any> => {
   connectToDB();
  try {
    const userUrl = await UserUrl.findById(id).populate({
      path: 'url',
      model: Url
    }).exec();

    return userUrl;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
