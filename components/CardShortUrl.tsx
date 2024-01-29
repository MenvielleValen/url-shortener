import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface CardShortUrlProps{
    userUrl: {
        url: {
            longUrl: string,
            shortUrl: string,
        },
        description?: string
    }
} 

export const CardShortUrl = ({userUrl}: CardShortUrlProps) => {
  return (
    <Card className="flex flex-col overflow-hidden text-ellipsis text-nowrap justify-between rounded-lg border border-indigo-400 bg-midnight transition-all hover:shadow-lg">
      <CardHeader>
        <CardTitle className="text-white">/s/{userUrl.url.shortUrl}</CardTitle>
        <CardDescription>{userUrl.url.longUrl}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-gray-400">{userUrl.description || 'No description.'}</p>
      </CardContent>
    </Card>
  );
};
