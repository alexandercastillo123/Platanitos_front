"use client";
import { Card,CardHeader, CardContent, CardTitle } from '@/components/ui/card'
import { Field, FieldGroup, } from '@/components/ui/field'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import FloatingLabel from '../_components/floating-label'
import { Button } from '@/components/ui/button'
import {useForm} from 'react-hook-form'
import { loginFormSchema, type LoginRequest } from '@/utils/validation';
import {zodResolver} from '@hookform/resolvers/zod'
import userData from '../_data/usuario.json'
import { useState } from 'react';


export default function Page() {
    const [tab, setTab] = useState<'email' | 'tel'>('email')
    const [pass, setPass] = useState(false)
    const {register, handleSubmit, getValues, resetField} = useForm<LoginRequest>({
        defaultValues: {
            type: tab,
            email: '',
            password: ''
        },
        resolver: zodResolver(loginFormSchema),
        mode: "onSubmit"
    })
    const handleTab = () => {
        if(tab === 'email') setTab('tel')
        if(tab === 'tel') setTab('email')
        setPass(false);
        resetField('email')
        resetField('tel')
        resetField('password')
    }

    const handlePass = () => {
        const verify = getValues(tab)
        const isExits = userData.find(user => user.email === verify || user.tel === verify)
        if(isExits) setPass(true)
        else setPass(false)
        console.log(verify)
    }


    return (
        <main className='flex min-h-svh w-full items-center justify-center p-6 md:p-10"'>
            <Card className='w-full max-w-sm'>
                <CardHeader>
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
                <CardContent>
                    <form action="POST">
                        <FieldGroup>
                            <FloatingLabel
                                type={tab}
                                id={tab}
                                label={tab === 'email' ? 'Correo electrónico' : 'Teléfono'}
                                register={register(tab)}
                            />
                            {pass && (
                                <FloatingLabel
                                    type='password'
                                    id='password'
                                    label='Contraseña'
                                    register={register('password')}
                                />
                            )}
                            <Field>
                                <Button
                                    type='button'
                                    className='bg-[#0c550f] hover:bg-[#7ec976] cursor-pointer h-10 my-1 px-3 py-2'
                                    onClick={handlePass}
                                >
                                    CONTINUAR
                                </Button>
                            </Field>
                        </FieldGroup>
                        
                    </form>
                </CardContent>
            </Card>
        </main>
    )
}
