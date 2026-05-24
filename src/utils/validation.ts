import * as z from 'zod'

export const loginFormSchema = z.union([
    z.object({
        type: z.literal('email'),
        email: z.string().email(),
        password: z.string()
    }),
    z.object({
        type: z.literal('tel'),
        tel: z.string().min(10).regex(/^[0-9]+$/, "Solo se permiten números"),
        password: z.string()
    })
])

export type LoginRequest = z.infer<typeof loginFormSchema>