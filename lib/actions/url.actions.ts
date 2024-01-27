"use server";

import Url from "../models/url.model";
import { connectToDB } from "../mongoose";
import { Base62Converter } from "../utils";

const shortUrlExist = async (shortUrl: string): Promise<boolean> => {
  connectToDB();
  try {
    const exist = await Url.findOne({ shortUrl });
    return Promise.resolve(exist !== null);
  } catch (error) {
    throw error;
  }
};

export async function createUrl(longUrl: string): Promise<any> {
  const randomNumber: number = Math.floor(Math.random() * 1000000); // Número aleatorio entre 0 y 999999
  const base62Representation: string = Base62Converter.toBase62(randomNumber);

  try {
    if(await shortUrlExist(base62Representation)){
        return createUrl(longUrl);
    }

    const url = new Url({
        longUrl,
        shortUrl: base62Representation.toLowerCase()
    });

    const createModel = await url.save();

    return createModel.shortUrl;

  } catch (error) {
    throw error;
  }
}
