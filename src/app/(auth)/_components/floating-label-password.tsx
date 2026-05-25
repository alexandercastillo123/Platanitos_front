"use client"
import { Field, FieldLabel } from '@/components/ui/field'
import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { UseFormRegisterReturn } from 'react-hook-form'
import { InputGroup, InputGroupButton, InputGroupInput } from '@/components/ui/input-group'

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string
    id: string
    register?: UseFormRegisterReturn
    focus?: boolean
    hasError?: boolean
}

export default function FloatingLabelPassword({ label, id, register, focus = false, hasError = false, className, ...props }: Props) {
    const [showPassword, setShowPassword] = useState(false)
    
    return (
        <Field className="relative flex flex-row gap-0 w-full">
            <InputGroup className={`h-auto w-full focus-within:ring-0! focus-within:ring-offset-0! ${hasError ? 'border-red-500! focus-within:border-red-500!' : 'focus-within:border-[#55b849]!'}`}>
                <InputGroupInput
                    placeholder=" "
                    type={showPassword ? 'text' : 'password'}
                    {...register}
                    {...props}
                    id={id}
                    className={`peer placeholder-transparent! h-14! pt-4 transition-all w-full ${className}`}
                    autoFocus={focus}
                />
                <FieldLabel 
                    className="absolute transition-all top-3.5 left-2.5 -translate-y-1/2 text-gray-600 text-xs
                        peer-focus:top-3.5
                        peer-focus:text-xs
                        peer-placeholder-shown:top-1/2
                        peer-placeholder-shown:text-sm
                        cursor-text"
                    htmlFor={id}
                >
                    {label}
                </FieldLabel>
                <InputGroupButton
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="cursor-pointer p-3 h-full hover:bg-white"
                >
                    {showPassword ? <EyeOff /> : <Eye />}
                </InputGroupButton>
            </InputGroup>
        </Field>
    )
}
