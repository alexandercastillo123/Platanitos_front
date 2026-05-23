import * as z from 'zod'

export const loginFormSchema = z.object({
    email: z.string().email().min(1, "El email es requerido"),
    password: z.string()
})

export type LoginRequest = z.infer<typeof loginFormSchema>