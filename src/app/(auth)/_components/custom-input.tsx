'use client'
import {useState} from 'react'
import { UseFormRegisterReturn} from 'react-hook-form'
import { Eye, EyeOff } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Field, FieldLabel } from '@/components/ui/field'
import Image from 'next/image'
import {Label} from '@/components/ui/label'


interface props extends React.InputHTMLAttributes<HTMLInputElement> {
    type: string,
    label: string,
    id: string
    register?: UseFormRegisterReturn
    focus?: boolean,
    hasError?: boolean,
    errorMessage?: string,
    innerRef?: React.Ref<HTMLInputElement>
}
export default function CustomInput({
    type, label, id, register, focus = false, innerRef,
    hasError = false, errorMessage, className, ...props
}: props) {
    const [showPassword, setShowPassword] = useState(false)
    // Logica para telefono
    const handleTelInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if(type === 'tel'){
            const teclasPermitidas = ['Backspace', 'Delete', 'Tab', 'Enter', 'ArrowLeft', 'ArrowRight']
            if(teclasPermitidas.includes(e.key)) return
            if(!/^[0-9]*$/.test(e.key)) e.preventDefault()
        }
    }

    return (
        <Field className="relative flex flex-col gap-1 w-full">
            <div className='relative flex items-center w-full'>
                {type === 'tel' && (
                    <div
                        className='rounded-l-lg h-14 focus-visible:ring-0 focus-visible:border-[#55b849] w-30 border border-input'
                    >
                        <div className='flex flex-row items-center justify-center gap-1 h-full w-auto'>
                            <Image
                                src="https://flagcdn.com/pe.svg"
                                alt='peru'
                                width={20}
                                height={16}
                            />
                            <Label>
                                +51
                            </Label>
                        </div>
                    </div>
                )}
                <Input
                    type={showPassword ? "text" : type}
                    placeholder=" "
                    id={id}
                    className={
                        `peer placeholder-transparent h-14 pt-4 focus-visible:ring-0
                         ${type === 'tel' ? 'rounded-l-none' : 'rounded-lg'}
                         w-full ${type === "password" ? "pr-13" : ""} md:${type === "password" ? "pr-11" : ""}
                         ${className}
                         ${hasError ? "border-red-500 focus-visible:border-red-500" : "focus-visible:border-[#55b849]"}
                         `
                        }
                    autoFocus={focus}
                    onKeyDown={handleTelInput}
                    maxLength={type === 'tel' ? 9 : 50}
                    {...register}
                    {...props}
                    ref={innerRef}
                />
                <FieldLabel
                    className={`absolute transition-all top-3.5 ${type === 'tel' ? "left-24.5" : "left-2.5"} -translate-y-1/2 text-gray-600 text-xs
                            peer-focus:top-3.5
                            peer-focus:text-xs
                            peer-placeholder-shown:top-1/2
                            peer-placeholder-shown:text-sm
                            cursor-text`}
                    htmlFor={id}
                >
                    {label}
                </FieldLabel>
                {type === "password" && (
                    <Button
                        variant={'ghost'}
                        size={'icon'}
                        className='absolute right-2 top-2.5 h-9 w-9 text-gray-500 hover:text-gray-700 cursor-pointer'
                        tabIndex={-1}
                        onClick={() => setShowPassword(!showPassword)}
                        type='button'
                    >
                        {showPassword ? <EyeOff size={18} /> : <Eye  size={18}/>}
                    </Button>
                )}
            </div>
            {hasError && (
                <FieldLabel htmlFor={id} className={"text-red-500 text-[11px]"}>
                    {errorMessage}
                </FieldLabel>
            )}
        </Field>
    )
}
