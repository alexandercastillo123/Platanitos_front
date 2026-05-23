"use client"
import { Field, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { UseFormRegisterReturn } from 'react-hook-form'

interface props {
    type: string,
    id: string
    label: string
    register?: UseFormRegisterReturn
}
export default function FloatingLabel({ type, id, label, register } : props) {
    const [showPassword, setShowPassword] = useState(false)

    const isPassword = type === 'password'
    const inputType = isPassword && showPassword ? 'text' : type
    return (
        <Field className='relative'>
            <Input
                placeholder=' hola'
                type={inputType}
                {...register}
                id={id}
                className='peer placeholder-transparent! h-14 pt-4'
            >
            </Input>
            <FieldLabel 
                className='absolute transition-all top-4 left-3 -translate-y-1/2 text-gray-600 text-xs
                    peer-focus:top-4
                    peer-focus:text-xs
                    
                    peer-placeholder-shown:top-1/2
                    peer-placeholder-shown:text-sm
                    cursor-text
                    '
                htmlFor={id}>
                {label}
            </FieldLabel>
            {isPassword && (
                <Button
                    type='button'
                    onClick={() => setShowPassword(!showPassword)}
                    variant={'ghost'}
                    className='absolute right-3 top-4 w-auto! cursor-pointer'
                >
                    {showPassword ? <EyeOff /> : <Eye />}
                </Button>
            )}
        </Field>
    )
}
