import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CoppyButton } from "./CoppyButton";
import { CardShortUrlOptions } from "./CardShortUrlOptions";

interface CardShortUrlProps {
  userUrl: {
    id: string;
    url: {
      longUrl: string;
      shortUrl: string;
    };
    description?: string;
    clickCounter?: number;
    lastClickDate?: string;
  };
}

export const CardShortUrl = ({ userUrl }: CardShortUrlProps) => {
  return (
    <Card className="flex flex-col overflow-hidden text-ellipsis text-nowrap justify-between rounded-lg border border-indigo-400 bg-midnight transition-all hover:shadow-lg h-[150px] w-[425px]">
      <CardHeader className="p-3">
        <CardTitle className="text-white flex items-center justify-between">
          <div className="flex gap-3 items-center">
            /s/{userUrl.url.shortUrl}
            <CoppyButton
              text={`${process.env.URL_BASE}/s/${userUrl.url.shortUrl}`}
            />
          </div>
          <CardShortUrlOptions id={userUrl.id} />
        </CardTitle>
        <CardDescription className="max-w-[250px] text-ellipsis overflow-hidden flex flex-col">
          <div>
            {userUrl.url.longUrl}
            <p className="text-indigo-400">
              Clicks in short link: {userUrl?.clickCounter || 0}
            </p>
          </div>

          <div>
            <p className="text-gray-400 max-w-[400px] text-ellipsis overflow-hidden">
              {userUrl.description || "No description. "}
            </p>
          </div>
        </CardDescription>
      </CardHeader>
    </Card>
  );
};
