import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FaRegCopy } from "react-icons/fa6";
import { CoppyButton } from "./CoppyButton";
import { CardShortUrlOptions } from "./CardShortUrlOptions";

interface CardShortUrlProps {
  userUrl: {
    id: string,
    url: {
      longUrl: string;
      shortUrl: string;
    };
    description?: string;
  };
}

export const CardShortUrl = ({ userUrl }: CardShortUrlProps) => {
  return (
    <Card className="flex flex-col overflow-hidden text-ellipsis text-nowrap justify-between rounded-lg border border-indigo-400 bg-midnight transition-all hover:shadow-lg">
      <CardHeader>
        <CardTitle className="text-white flex items-center justify-between">
          <div className="flex gap-3 items-center">
            /s/{userUrl.url.shortUrl}
            <CoppyButton
              text={`${process.env.URL_BASE}/s/${userUrl.url.shortUrl}`}
            />
          </div>
          <CardShortUrlOptions id={userUrl.id} />
        </CardTitle>
        <CardDescription>{userUrl.url.longUrl}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-gray-400">
          {userUrl.description || "No description."}
        </p>
      </CardContent>
    </Card>
  );
};
