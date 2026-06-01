"use client";
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card'
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import FloatingLabelInput from '../_components/floating-label-input'
import FloatingLabelPassword from '../_components/floating-label-password'
import FloatingLabelPhone from '../_components/floating-label-phone'
import { Button } from '@/components/ui/button'
import { useForm, useWatch, FieldError } from 'react-hook-form'
import { loginFormSchema, type LoginRequest } from '@/utils/validation';
import { zodResolver } from '@hookform/resolvers/zod'
import { useState, useEffect } from 'react';
import { useLogin } from "../_hooks/useLogin"
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Page() {
    const router = useRouter();
    const { userFound, reset: resetLoginState, checkUserExists } = useLogin()
    const [tab, setTab] = useState<'email' | 'tel'>('email')
    
    const { register, handleSubmit, getValues, reset: resetForm, setValue, setFocus, control, formState: { errors } } = useForm<LoginRequest>({
        defaultValues: {
            type: 'email',
            email: '',
            password: ''
        },
        resolver: zodResolver(loginFormSchema),
        mode: "onChange"
    })

    const emailError = (errors as { email?: FieldError }).email;
    const telError = (errors as { tel?: FieldError }).tel;
    const activeValue = useWatch({ control, name: tab });
    const isContinueDisabled = !!(tab === 'email' ? emailError : telError) || !activeValue;

    const handleTab = (siguienteTab: string) => {
        const targetTab = siguienteTab as 'email' | 'tel'
        setTab(targetTab)
        resetLoginState()
        resetForm({
            type: targetTab,
            email: '',
            tel: '',
            telPrefix: '',
            password: ''
        })
    }

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (userFound) {
                setFocus('password')
            } else {
                setFocus(tab)
            }
        }, 100)
        return () => clearTimeout(timeout)
    }, [userFound, tab, setFocus])

    const handleContinue = () => {
        const valor = getValues(tab)
        if (valor) {
            checkUserExists(valor)
        }
    }

    const handleLogin = (data: LoginRequest) => {
        router.push('/home')
    }

    return (
        <main className='flex min-h-auto w-full p-3 md:p-10 justify-center'>
            <Card className='w-full max-w-lg p-2 mx-auto gap-2 md:py-7.5 md:px-19.5 ring-0'>
                <CardHeader className='p-1'>
                    <CardTitle className='text-center mb-4 text-xl'>
                        Iniciar Sesión
                    </CardTitle>
                    <Tabs className='w-full' value={tab} onValueChange={handleTab}>
                        <TabsList className='w-full h-14! p-2'>
                            <TabsTrigger value='email' className='data-[state=active]:bg-[#0c550f] data-[state=active]:text-white text-[#0c550f] hover:text-[#0c550f] cursor-pointer'>Correo electrónico</TabsTrigger>
                            <TabsTrigger value='tel' className='data-[state=active]:bg-[#0c550f] data-[state=active]:text-white text-[#0c550f] hover:text-[#0c550f] cursor-pointer'>Teléfono</TabsTrigger>
                        </TabsList>
                    </Tabs>
                </CardHeader>
                <CardContent className='p-1 overflow-hidden'>
                    <form action="POST" onSubmit={handleSubmit(handleLogin)}>
                        <input type='hidden' {...register('type')} />
                        <input type='hidden' {...register('telPrefix')} />
                        <FieldGroup className='gap-3'>
                            {tab === 'email' ? (
                                <div className="flex flex-col gap-1 w-full">
                                    <FloatingLabelInput
                                        key="email"
                                        type="email"
                                        id="email"
                                        label="Correo electrónico"
                                        register={register('email')}
                                        focus={!userFound}
                                        hasError={!!emailError}
                                    />
                                    {emailError && (
                                        <FieldLabel htmlFor="email" className="text-red-500 text-xs mt-1">
                                            {emailError.message}
                                        </FieldLabel>
                                    )}
                                </div>
                            ) : (
                                <div className="flex flex-col gap-1 w-full">
                                    <FloatingLabelPhone
                                        key="tel"
                                        id="tel"
                                        label="Teléfono"
                                        register={register('tel')}
                                        onPrefixChange={(prefix) => setValue('telPrefix', prefix)}
                                        focus={!userFound}
                                        hasError={!!telError}
                                    />
                                    {telError && (
                                        <FieldLabel htmlFor="tel" className="text-red-500 text-xs mt-1">
                                            {telError.message}
                                        </FieldLabel>
                                    )}
                                </div>
                            )}
                            
                            {userFound && (
                                <>
                                    <div className="flex flex-col gap-1 w-full">
                                        <FloatingLabelPassword
                                            key="password"
                                            id="password"
                                            label="Contraseña"
                                            register={register('password')}
                                            focus={userFound}
                                            hasError={!!errors.password}
                                        />
                                        {errors.password && (
                                            <FieldLabel htmlFor="password" className="text-red-500 text-xs mt-1">
                                                {errors.password.message}
                                            </FieldLabel>
                                        )}
                                    </div>
                                    <Field>
                                        <Link
                                            href={'/restablecer-contrasena'}
                                            className='text-right text-[#0C550F]'
                                        >
                                            ¿Olvidaste tu contraseña?
                                        </Link>
                                    </Field>
                                    <Field>
                                        <Button
                                            className='bg-[#0c550f] hover:bg-[#7ec976] cursor-pointer h-11 my-1 px-3 py-2 tracking-widest'
                                        >
                                            INICIAR SESIÓN
                                        </Button>
                                    </Field>
                                </>
                            )}
                            {!userFound && (
                                <Field>
                                    <Button
                                        type='button'
                                        className='bg-[#0c550f] hover:bg-[#7ec976] cursor-pointer h-11 my-1 px-3 py-2'
                                        onClick={handleContinue}
                                        disabled={isContinueDisabled}
                                    >
                                        CONTINUAR
                                    </Button>
                                </Field>
                            )}
                            <Field>
                                <FieldLabel className='text-xs line-clamp-2 font-light text-[#333333]'>
                                    Con tu cuenta Platanitos, comienzas a acumular puntos que puedes usar como descuentos. 💰
                                </FieldLabel>
                            </Field>
                            <Field>
                                <FieldLabel className='text-sm line-clamp-2 text-center text-[#222222] font-normal'>
                                    ¿Aún no tienes una cuenta?
                                </FieldLabel>
                            </Field>
                            <Field>
                                <Button
                                    type='button'
                                    className='border-[#0C550F] text-[#0C550F] bg-white cursor-pointer h-9 px-3 py-2 hover:bg-white! hover:text-[#0C550F]! font-normal tracking-widest rounded-md'
                                    asChild
                                >
                                    <Link href={'/registrarse'}>
                                        CREA TU CUENTA
                                    </Link>
                                </Button>
                            </Field>
                        </FieldGroup>
                    </form>
                </CardContent>
            </Card>
        </main>
    )
}
