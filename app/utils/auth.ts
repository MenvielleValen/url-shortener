import { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import GitlabProvider from "next-auth/providers/gitlab";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "./mongoDb";
import { Adapter } from "next-auth/adapters";

export const authOptions = {
  adapter: MongoDBAdapter(clientPromise, {
    collections: {
      Accounts: "Accounts",
      Sessions: "Sessions",
      Users: "Users",
      VerificationTokens: "VerificationTokens",
    },
    databaseName: 'shortUrl'
  }) as Adapter,
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    GitlabProvider({
      clientId: process.env.GITLAB_CLIENT_ID!,
      clientSecret: process.env.GITLAB_CLIENT_SECRET!
    })
  ],
} satisfies NextAuthOptions;
