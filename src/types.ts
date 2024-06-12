import { z } from "zod";

export const userSchema = z.object({
    id: z.number().int().positive(),
    name: z.string(),
    mobile: z.number(),
    email: z.string().email(),
})

export const PostSchema = userSchema.omit({id: true});

export type User = z.infer<typeof userSchema>

