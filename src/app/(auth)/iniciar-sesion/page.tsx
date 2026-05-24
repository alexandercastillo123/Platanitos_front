"use client";
import { Card,CardHeader, CardContent, CardTitle } from '@/components/ui/card'
import { Field, FieldGroup, FieldLabel} from '@/components/ui/field'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import FloatingLabel from '../_components/floating-label'
import { Button } from '@/components/ui/button'
import {useForm} from 'react-hook-form'
import { loginFormSchema, type LoginRequest } from '@/utils/validation';
import {zodResolver} from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react';
import {useLogin} from "../_hooks/useLogin"
import Link from 'next/link';


export default function Page() {
    const {handlePass, pass, resetPass} = useLogin()
    const [tab, setTab] = useState<'email' | 'tel'>('email')
    const {register, handleSubmit, getValues, resetField, setFocus, setValue} = useForm<LoginRequest>({
        defaultValues: {
            type: 'email',
            email: '',
            password: ''
        },
        resolver: zodResolver(loginFormSchema),
        mode: "onSubmit"
    })
    const handleTab = (siguienteTab: string) => {
        const targetTab = siguienteTab as 'email' | 'tel'
        setTab(targetTab)
        setValue('type', targetTab)
        resetPass()
        resetField('email')
        resetField('tel')
        resetField('telPrefix')
        resetField('password')
    }
                
    useEffect(() => {
        const timeout = setTimeout(() => {
            if(pass) setFocus('password')
            else setFocus(tab)
        }, 100)
        return () =>clearTimeout(timeout)
    }, [pass, tab, setFocus])


    return (
        <main className='flex min-h-auto w-full p-3 md:p-10 justify-center'>
            <Card className='w-full max-w-lg p-2 mx-auto gap-2 md:py-7.5 md:px-19.5 ring-0'>
                <CardHeader className='p-1'>
                    <CardTitle className='text-center mb-4 text-xl'>
                        Iniciar Sesión
                    </CardTitle>
                    <Tabs className='w-full' value={tab} onValueChange={handleTab} >
                        <TabsList className='w-full h-14! p-2'>
                            <TabsTrigger value='email' className='data-[state=active]:bg-[#0c550f] data-[state=active]:text-white text-[#0c550f] hover:text-[#0c550f] cursor-pointer'>Correo electrónico</TabsTrigger>
                            <TabsTrigger value='tel' className='data-[state=active]:bg-[#0c550f] data-[state=active]:text-white text-[#0c550f] hover:text-[#0c550f] cursor-pointer'>Teléfono</TabsTrigger>
                        </TabsList>
                    </Tabs>
                </CardHeader>
                <CardContent className='p-1 overflow-hidden'>
                    <form action="POST" onSubmit={handleSubmit((data) => console.log(data))}>
                        <input type='hidden' {...register('type')} />
                        <input type='hidden' {...register('telPrefix')} />
                        <FieldGroup className='gap-3'>
                            <FloatingLabel
                                type={tab}
                                id={tab}
                                label={tab === 'email' ? 'Correo electrónico' : 'Teléfono'}
                                register={register(tab)}
                                onPrefixChange={(prefix) => setValue('telPrefix', prefix)}
                                focus={!pass}
                            />
                            {pass && (
                                <>
                                    <FloatingLabel
                                        type='password'
                                        id='password'
                                        label='Contraseña'
                                        register={register('password')}
                                    />
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
                            { !pass && (
                                <Field>
                                    <Button
                                        type='button'
                                        className='bg-[#0c550f] hover:bg-[#7ec976] cursor-pointer h-11 my-1 px-3 py-2'
                                        onClick={() => handlePass(getValues(tab))}
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
                                    onClick={() => handlePass(getValues(tab))}
                                    asChild
                                >
                                    <Link
                                        href={'/registrarse'}
                                    >
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
