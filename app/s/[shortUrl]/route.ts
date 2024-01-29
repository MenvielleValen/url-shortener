import { Url } from "@/lib/models/url.model";
import { connectToDB } from "@/lib/mongoose";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

async function handleAnalytics(longUrl: string): Promise<void> {
  // Aquí puedes realizar el procesamiento de análisis
  // Por ejemplo, puedes guardar información sobre la visita, como la fecha, la IP del cliente, etc.
  console.log(`Procesando análisis para la URL: ${longUrl}`);
  // Simulando un retraso para propósitos de demostración
  await new Promise((resolve) => setTimeout(resolve, 2000));
  console.log(`Análisis completado para la URL: ${longUrl}`);
}

export async function GET(
  req: NextRequest,
  { params }: { params: { shortUrl: string } }
) {
  connectToDB();
  const shortUrl = params.shortUrl;
  const reqHeader = headers();
  const host = reqHeader.get("host");

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
    handleAnalytics(longUrl).catch((error) => {
      console.error(
        `Error al procesar análisis para la URL: ${longUrl}`,
        error
      );
    });

    return response;
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Invalid Url" });
  }
}
