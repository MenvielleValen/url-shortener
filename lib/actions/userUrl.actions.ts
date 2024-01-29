"use server"

import UserUrl from "../models/user-url";
import { connectToDB } from "../mongoose";



export const findUserUrls = async (userEmail: string): Promise<any[]> => {
    connectToDB();
    try {
      const userUrls = await UserUrl.find({ userEmail }).populate('url').exec();
      return userUrls;
    } catch (error) {
      throw error;
    }
  };
  