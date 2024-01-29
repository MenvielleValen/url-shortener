import * as z from 'zod';


export const UrlSchema = z.object({
    longUrl: z.string().url().min(1),
    shortUrl: z.string().min(1).max(8),
    description: z.string().max(200),
    userEmail: z.string().email().min(1)
})
