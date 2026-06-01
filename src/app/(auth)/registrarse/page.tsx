
"use client";
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card'
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { useForm, useWatch, FieldError } from 'react-hook-form'
import { registerFormSchema, type RegisterRequest } from '@/utils/validation';
import { zodResolver } from '@hookform/resolvers/zod'
import { useState, useEffect } from 'react';
import Link from 'next/link';
import CustomInput from '../_components/custom-input';

export default function Page() {
    const [tab, setTab] = useState<'email' | 'tel'>('email')
    
    const { register, handleSubmit, setValue, setFocus, control, formState: { errors } } = useForm<RegisterRequest>({
        defaultValues: {
            type: 'email',
            email: ''
        },
        resolver: zodResolver(registerFormSchema),
        mode: "onChange"
    })

    const emailError = (errors as { email?: FieldError }).email;
    const telError = (errors as { tel?: FieldError }).tel;
    const [email, tel, dni, nombres, apellidos] = useWatch({control,
        name: ['email', 'tel', 'dni', 'nombres', 'apellidos']
    })
    const tipoValido = tab === 'email' ? (!emailError && email) : (!telError && tel)
    const camposComunes = 
        dni?.length === 8 && !errors.dni &&
        nombres?.length > 0 && !errors.nombres &&
        apellidos?.length > 0 && !errors.apellidos
    const isRegisterDisabled = !tipoValido || !camposComunes

    const handleTab = (siguienteTab: string) => {
        const targetTab = siguienteTab as 'email' | 'tel'
        setTab(targetTab)
        setValue('type', targetTab, {shouldValidate: true})
        if(targetTab === 'email') setValue('tel', '')
        if(targetTab === 'tel') setValue('email', '')
    }

    useEffect(() => {
        const timeout = setTimeout(() => {
            setFocus(tab)
        }, 100)
        return () => clearTimeout(timeout)
    }, [tab, setFocus])

    return (
        <Card className='w-full max-w-lg p-4 mx-auto gap-2 md:py-7.5 md:px-17.5 ring-0'>
            <CardHeader className='p-0'>
                <CardTitle className='text-center mb-4 text-xl font-medium text-[#212529]'>
                    Crea tu cuenta
                </CardTitle>
                <Tabs className='w-full mb-4' value={tab} onValueChange={handleTab}>
                    <TabsList className='w-full h-14! p-2'>
                        <TabsTrigger value='email' className='data-[state=active]:bg-[#0c550f] data-[state=active]:text-white text-[#0c550f] hover:text-[#0c550f] cursor-pointer'>Correo electrónico</TabsTrigger>
                        <TabsTrigger value='tel' className='data-[state=active]:bg-[#0c550f] data-[state=active]:text-white text-[#0c550f] hover:text-[#0c550f] cursor-pointer'>Teléfono</TabsTrigger>
                    </TabsList>
                </Tabs>
            </CardHeader>
            <CardContent className='p-0 overflow-hidden'>
                <form action="POST" onSubmit={handleSubmit((data) => console.log(data))}>
                    <input type='hidden' {...register('type')} />
                    <FieldGroup className='gap-3'>
                        {tab === 'email' ? (
                            <CustomInput
                                key={'input-email'}
                                type={'email'}
                                id={'email'}
                                label={'Correo electrónico'}
                                register={register('email')}
                                innerRef={register('email').ref}
                                hasError={!!emailError}
                                errorMessage={emailError?.message}
                            />
                        ) : (
                            <CustomInput
                                key={'input-tel'}
                                type={'tel'}
                                id={'tel'}
                                label={'Teléfono'}
                                register={register('tel')}
                                innerRef={register('tel').ref}
                                hasError={!!telError}
                                errorMessage={telError?.message}
                            />
                        )}
                        <CustomInput
                            type={'text'}
                            id={'dni'}
                            label={'DNI'}
                            register={register('dni')}
                            innerRef={register('dni').ref}
                            maxLength={8}
                            hasError={!!errors.dni}
                            errorMessage={errors.dni?.message}
                        />
                        <CustomInput
                            type={'text'}
                            id={'nombres'}
                            label={'Nombres'}
                            register={register('nombres')}
                            innerRef={register('nombres').ref}
                            hasError={!!errors.nombres}
                            errorMessage={errors.nombres?.message}
                        />
                        <CustomInput
                            type={'text'}
                            id={'apellidos'}
                            label={'Apellidos'}
                            register={register('apellidos')}
                            innerRef={register('apellidos').ref}
                            hasError={!!errors.apellidos}
                            errorMessage={errors.apellidos?.message}
                        />
                        <Field>
                            <Button
                                className='bg-[#0c550f] hover:bg-[#7ec976] cursor-pointer h-11 my-1 px-3 py-2 tracking-[1.25px]'
                                disabled={isRegisterDisabled}
                            >
                                CREA TU CUENTA
                            </Button>
                        </Field>
                        <Field>
                            <FieldLabel className='text-sm line-clamp-2 text-center text-[#222222] font-normal'>
                                ¿Tienes una cuenta?
                            </FieldLabel>
                        </Field>
                        <Field>
                            <Button
                                type='button'
                                className='border-[#0C550F] text-[#0C550F] bg-white cursor-pointer h-9 px-3 py-2 hover:bg-white! hover:text-[#0C550F]! font-normal tracking-[1.25px] rounded-md'
                                asChild
                            >
                                <Link href={'/iniciar-sesion'}>
                                    INICIAR SESION
                                </Link>
                            </Button>
                        </Field>
                    </FieldGroup>
                </form>
            </CardContent>
        </Card>
    )
}