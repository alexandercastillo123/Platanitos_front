"use client";
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card'
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { useForm, useWatch, FieldError } from 'react-hook-form'
import { resetFormSchema, type ResetRequest } from '@/utils/validation';
import { zodResolver } from '@hookform/resolvers/zod'
import { useState, useEffect } from 'react';
import Link from 'next/link';
import CustomInput from '../_components/custom-input';

export default function Page() {
    const [tab, setTab] = useState<'email' | 'tel'>('email')
    
    const { register, handleSubmit, reset: resetForm, setFocus, control, formState: { errors } } = useForm<ResetRequest>({
        defaultValues: {
            type: 'email',
            email: ''
        },
        resolver: zodResolver(resetFormSchema),
        mode: "onChange"
    })

    const emailError = (errors as { email?: FieldError }).email;
    const telError = (errors as { tel?: FieldError }).tel;
    const activeValue = useWatch({ control, name: tab });
    const isResetDisabled = !!(tab === 'email' ? emailError : telError) || !activeValue;

    const handleTab = (siguienteTab: string) => {
        const targetTab = siguienteTab as 'email' | 'tel'
        setTab(targetTab)
        resetForm({
            type: targetTab,
            email: '',
            tel: '',
        })
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
                    Restablecer contraseña
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
                            <div className="flex flex-col gap-1 w-full">
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
                            </div>
                        ) : (
                            <>
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
                                <CustomInput
                                    type={'text'}
                                    id="text"
                                    label="Verificar con"
                                    value={'SMS'}
                                    readOnly
                                    aria-disabled="true"
                                    tabIndex={-1}
                                />
                            </>
                        )}
                        <Field>
                            <Button
                                className='bg-[#0c550f] hover:bg-[#7ec976] cursor-pointer h-11 my-1 px-3 py-2 tracking-[1.25px]'
                                disabled={isResetDisabled}
                            >
                                RESTABLECE TU CONTRASEÑA
                            </Button>
                        </Field>
                        <Field>
                            <FieldLabel className='text-sm line-clamp-2 text-center text-[#222222] font-normal'>
                                ó
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
                        <Field>
                            <FieldLabel className='text-sm line-clamp-2 text-center text-[#222222] font-normal'>
                                Si no cuenta con el acceso a su correo electrónico y/o teléfono. Llámanos al 01 500 0460
                            </FieldLabel>
                        </Field>
                    </FieldGroup>
                </form>
            </CardContent>
        </Card>
    )
}