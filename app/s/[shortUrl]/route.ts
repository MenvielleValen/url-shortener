import Url from "@/lib/models/url.model";
import UserUrl from "@/lib/models/user-url.model";
import { connectToDB } from "@/lib/mongoose";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

async function handleAnalytics(urlId: string): Promise<void> {
  // Aquí puedes realizar el procesamiento de análisis
  // Por ejemplo, puedes guardar información sobre la visita, como la fecha, la IP del cliente, etc.
  console.log(`Procesando análisis para la URL: ${urlId}`);
  const getUserUrl = await UserUrl.findOneAndUpdate({url: urlId}, {$inc: {'clickCounter': 1}, lastClickDate: Date.now()})

  console.log(getUserUrl);
  // Simulando un retraso para propósitos de demostración
  console.log(`Análisis completado para la URL: ${urlId}`);
}

export async function GET(
  req: NextRequest,
  { params }: { params: { shortUrl: string } }
) {
  connectToDB();
  const shortUrl = params.shortUrl;
  const host = "https://minlink.vercel.app/";

  if (!shortUrl) {
    if (host) {
      return NextResponse.redirect(host);
    }
  }

  try {
    const getLongUrl = await Url.findOne({ shortUrl: shortUrl });

    if (!getLongUrl) {
      if (host) {
        return NextResponse.redirect(host);
      }
    }

    // Redireccionar a la URL larga
    const longUrl = getLongUrl.longUrl;
    const response = NextResponse.redirect(longUrl);

    // Procesar análisis de manera asíncrona
    handleAnalytics(getLongUrl.id).catch((error) => {
      console.error(
        `Error al procesar análisis para la URL: ${longUrl}`,
        error
      );
    });

    return response;
  } catch (error) {
    console.error(error);
    return NextResponse.redirect(host);
  }
}
