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

export const resetFormSchema = z.discriminatedUnion('type', [
    z.object({
        type: z.literal('email'),
        email: z.string().email("Correo electrónico inválido")
    }),
    z.object({
        type: z.literal('tel'),
        telPrefix: z.string().min(1),
        tel: z.string().length(9, "Debe tener 9 digitos").regex(/^[0-9]+$/, "Solo se permiten números")
    })
])

export const registerFormSchema = z.discriminatedUnion('type', [
    z.object({
        type: z.literal('email'),
        email: z.string().email("Correo electrónico inválido"),
        dni: z.string().min(1, "DNI requerido").max(8, "El DNI solo contiene 8 dígitos."),
        nombres: z.string().min(1, "Nombre requerido"),
        apellidos: z.string().min(1, "Apellido requerido")
    }),
    z.object({
        type: z.literal('tel'),
        telPrefix: z.string().min(1),
        tel: z.string().length(9, "Debe tener 9 digitos").regex(/^[0-9]+$/, "Solo se permiten números"),
        dni: z.string().min(1, "DNI requerido").max(8, "El DNI solo contiene 8 dígitos."),
        nombres: z.string().min(1, "Nombre requerido"),
        apellidos: z.string().min(1, "Apellido requerido")
    })
])

export type LoginRequest = z.infer<typeof loginFormSchema>
export type ResetRequest = z.infer<typeof resetFormSchema>
export type RegisterRequest = z.infer<typeof registerFormSchema>