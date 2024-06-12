import { z } from "zod";

export const userSchema = z.object({
    id: z.number().int().positive(),
    name: z.string(),
    mobile: z.number().refine((num) => num.toString().length === 10, {
        message: "Mobile number must be 10 digits long"
    }),
    email: z.string().email(),
    password: z.string().min(8),
})
export const discussionSchema = z.object({
    id: z.number().int().positive(),
    text: z.string(),
    image: z.string().url(),
    hashtags: z.array(z.string().regex(/#(?!\s*$)([A-Za-z0-9_]+|[\p{L}\p{N}_]+)/u)),
    createdAt: z.string().datetime()
})

export const userDataSchema = userSchema.omit({id: true});
export const discussionDataSchema = discussionSchema.omit({id: true, createdAt: true});

export type User = z.infer<typeof userSchema>
export type Discussion = z.infer<typeof discussionSchema>

