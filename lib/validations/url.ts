import * as z from 'zod';


export const UrlSchema = z.object({
    longUrl: z.string().url().min(1).toLowerCase(),
    shortUrl: z.string().min(1).max(8).toLowerCase().optional(),
    description: z.string().max(200),
    userEmail: z.string().email().min(1)
})
