import * as z from 'zod'

const passwordSchema = z.string().min(6, "Minimo 6 caracteres")


export const loginFormSchema = z.discriminatedUnion('type', [
    z.object({
        type: z.literal('email'),
        email: z.string().email("Correo electrónico inválido"),
        password: passwordSchema
    }),
    z.object({
        type: z.literal('tel'),
        telPrefix: z.string().min(1),
        tel: z.string().length(9, "Debe tener 9 digitos").regex(/^[0-9]+$/, "Solo se permiten números"),
        password: passwordSchema
    })
])

export type LoginRequest = z.infer<typeof loginFormSchema>